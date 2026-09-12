import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button.jsx";
import { playBellSound } from "../../utils/playBellSound.js";
import { speakNumber, cancelSpeech } from "../../utils/speakNumber.js";
import { friends } from "../../data/friends.js";
import "./CatchFamily.css";

const ANNOUNCE_FROM = 5;
const GRAVITY = 420; // px/s^2 — floaty enough to give a real chance to react
const BALL_RADIUS = 20;
const PADDLE_WIDTH = 132; // 110 + 20%
const PADDLE_HEIGHT = 19; // 16 + 20%
const PADDLE_BOTTOM_OFFSET = 24;
const PADDLE_KEY_SPEED = 480; // px/s when steering with the keyboard
const BOUNCE_FACTOR = 0.95;
const MIN_BOUNCE_SPEED = 260;
const MAX_BOUNCE_SPEED = 600;
const SPAWN_STEP_MS = 1200; // gap between each family member dropping in

const roster = friends.filter((f) => f.photo);

export default function CatchFamily({ game, onFinish, isLast }) {
  const [phase, setPhase] = useState("ready"); // ready | running | done
  const [remaining, setRemaining] = useState(game.timerSeconds ?? 0);
  const [lostCount, setLostCount] = useState(0);

  const arenaRef = useRef(null);
  const paddleRef = useRef(null);
  const ballRefs = useRef([]);
  const ballsPhysicsRef = useRef([]);
  const paddleXRef = useRef(0);
  const draggingRef = useRef(false);
  const keysRef = useRef({ left: false, right: false });
  const activeRef = useRef(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const spokenRef = useRef(null);

  const totalBalls = roster.length;

  function endRound() {
    clearInterval(intervalRef.current);
    cancelSpeech();
    playBellSound();
    setPhase("done");
  }

  // Sets up the physics + starts the render loop once the arena has mounted
  // (it only exists in the DOM once phase === "running").
  useEffect(() => {
    if (phase !== "running") return undefined;

    const arena = arenaRef.current;
    if (!arena) return undefined;

    const width = arena.clientWidth;
    const height = arena.clientHeight;

    paddleXRef.current = width / 2;
    if (paddleRef.current) {
      paddleRef.current.style.transform = `translate3d(${width / 2 - PADDLE_WIDTH / 2}px, 0, 0)`;
    }

    ballsPhysicsRef.current = roster.map((_, i) => ({
      x: ((i + 0.5) / totalBalls) * width,
      y: BALL_RADIUS,
      vx: (Math.random() - 0.5) * 140,
      vy: 0,
      lost: false,
      spawned: false,
      spawnAt: i * SPAWN_STEP_MS,
    }));

    ballsPhysicsRef.current.forEach((ball, i) => {
      const el = ballRefs.current[i];
      if (el) {
        el.classList.remove("catch-family__ball--lost", "is-spawned");
        el.style.transform = `translate3d(${ball.x - BALL_RADIUS}px, ${ball.y - BALL_RADIUS}px, 0)`;
      }
    });

    activeRef.current = true;
    lastTimeRef.current = null;
    let elapsedMs = 0;

    const loop = (time) => {
      if (!activeRef.current) return;
      const last = lastTimeRef.current ?? time;
      const dt = Math.min((time - last) / 1000, 0.05);
      lastTimeRef.current = time;
      elapsedMs += dt * 1000;

      const keys = keysRef.current;
      if (keys.left || keys.right) {
        const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
        const half = PADDLE_WIDTH / 2;
        const nextX = Math.min(
          Math.max(paddleXRef.current + dir * PADDLE_KEY_SPEED * dt, half),
          width - half
        );
        paddleXRef.current = nextX;
        if (paddleRef.current) {
          paddleRef.current.style.transform = `translate3d(${nextX - half}px, 0, 0)`;
        }
      }

      const paddleY = height - PADDLE_BOTTOM_OFFSET - PADDLE_HEIGHT;
      const paddleX = paddleXRef.current;
      let newlyLost = 0;

      ballsPhysicsRef.current.forEach((ball, i) => {
        if (ball.lost) return;

        if (!ball.spawned) {
          if (elapsedMs < ball.spawnAt) return;
          ball.spawned = true;
          const el = ballRefs.current[i];
          if (el) el.classList.add("is-spawned");
        }

        ball.vy += GRAVITY * dt;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        if (ball.x - BALL_RADIUS < 0) {
          ball.x = BALL_RADIUS;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x + BALL_RADIUS > width) {
          ball.x = width - BALL_RADIUS;
          ball.vx = -Math.abs(ball.vx);
        }

        if (ball.y - BALL_RADIUS < 0) {
          ball.y = BALL_RADIUS;
          ball.vy = Math.abs(ball.vy);
        }

        if (
          ball.vy > 0 &&
          ball.y + BALL_RADIUS >= paddleY &&
          ball.y + BALL_RADIUS <= paddleY + PADDLE_HEIGHT + 22 &&
          ball.x >= paddleX - PADDLE_WIDTH / 2 - BALL_RADIUS &&
          ball.x <= paddleX + PADDLE_WIDTH / 2 + BALL_RADIUS
        ) {
          const offset = (ball.x - paddleX) / (PADDLE_WIDTH / 2);
          const speed = Math.min(
            Math.max(Math.abs(ball.vy) * BOUNCE_FACTOR, MIN_BOUNCE_SPEED),
            MAX_BOUNCE_SPEED
          );
          ball.vy = -speed;
          ball.vx += offset * 120;
          ball.y = paddleY - BALL_RADIUS;
        }

        let justLost = false;
        if (ball.y + BALL_RADIUS >= height) {
          ball.lost = true;
          justLost = true;
          newlyLost += 1;
        }

        const el = ballRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${ball.x - BALL_RADIUS}px, ${ball.y - BALL_RADIUS}px, 0)`;
          if (justLost) el.classList.add("catch-family__ball--lost");
        }
      });

      if (newlyLost > 0) {
        setLostCount((c) => c + newlyLost);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase, totalBalls]);

  // Arrow keys / A-D steer the paddle — read by the physics loop above via
  // keysRef, so movement stays smooth and frame-synced like pointer drag.
  useEffect(() => {
    if (phase !== "running") return undefined;

    function handleKeyDown(e) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = true;
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = true;
      } else {
        return;
      }
      e.preventDefault();
    }

    function handleKeyUp(e) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = false;
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = false;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      keysRef.current.left = false;
      keysRef.current.right = false;
    };
  }, [phase]);

  // Countdown tick — kept free of side effects (see TimerChallenge.jsx for why).
  useEffect(() => {
    if (phase !== "running") return undefined;

    intervalRef.current = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      cancelSpeech();
    };
  }, [phase]);

  // Reacts to committed `remaining`/`lostCount` to end the round exactly once.
  useEffect(() => {
    if (phase !== "running") return;

    if (remaining <= 0 || lostCount >= totalBalls) {
      endRound();
      return;
    }

    if (remaining <= ANNOUNCE_FROM && spokenRef.current !== remaining) {
      spokenRef.current = remaining;
      speakNumber(remaining);
    }
  }, [remaining, lostCount, phase, totalBalls]);

  function handleStart() {
    spokenRef.current = null;
    setLostCount(0);
    setRemaining(game.timerSeconds ?? 0);
    setPhase("running");
  }

  function updatePaddleFromClientX(clientX) {
    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    const half = PADDLE_WIDTH / 2;
    const x = Math.min(Math.max(clientX - rect.left, half), rect.width - half);
    paddleXRef.current = x;
    if (paddleRef.current) {
      paddleRef.current.style.transform = `translate3d(${x - half}px, 0, 0)`;
    }
  }

  function handlePointerDown(e) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePaddleFromClientX(e.clientX);
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    updatePaddleFromClientX(e.clientX);
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  const savedCount = totalBalls - lostCount;

  return (
    <div className="sub-view sub-view--center">
      {phase === "ready" && (
        <>
          <p className="sub-view__timer-hint">
            {totalBalls} family members will drop in one by one! Drag the
            plank (or use the arrow keys) to keep them off the ground for{" "}
            {game.timerSeconds} seconds.
          </p>
          <Button size="lg" fullWidth onClick={handleStart}>
            Start
          </Button>
        </>
      )}

      {phase === "running" && (
        <>
          <div className="catch-family__hud">
            <span>⏱ {remaining}s</span>
            <span>
              Saved {savedCount}/{totalBalls}
            </span>
          </div>
          <div
            className="catch-family__arena"
            ref={arenaRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {roster.map((friend, i) => (
              <div
                key={friend.name + i}
                ref={(el) => (ballRefs.current[i] = el)}
                className="catch-family__ball"
                style={{ backgroundImage: `url(${friend.photo})` }}
              />
            ))}
            <div className="catch-family__paddle" ref={paddleRef} />
          </div>
          <Button variant="secondary" fullWidth onClick={endRound}>
            End Round Early
          </Button>
        </>
      )}

      {phase === "done" && (
        <>
          <div className="sub-view__timer sub-view__timer--done anim-pop-in">
            {savedCount}/{totalBalls}
          </div>
          <p className="sub-view__timer-hint">
            You saved {savedCount} of {totalBalls} family members!
          </p>
          <Button size="lg" fullWidth onClick={onFinish}>
            {isLast ? "Finish" : "Next Game"}
          </Button>
        </>
      )}
    </div>
  );
}
