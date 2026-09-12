import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button.jsx";
import { playBellSound } from "../../utils/playBellSound.js";
import { speakNumber, cancelSpeech } from "../../utils/speakNumber.js";
import "./shared.css";

const ANNOUNCE_FROM = 5;

export default function TimerChallenge({ game, onFinish, isLast }) {
  const [phase, setPhase] = useState("ready"); // ready | running | done
  const [remaining, setRemaining] = useState(game.timerSeconds ?? 0);
  const intervalRef = useRef(null);
  const spokenRef = useRef(null);

  // Ticks `remaining` down every second. Kept free of side effects — state
  // updaters run twice under StrictMode, which would double-fire anything
  // (like speech or sound) placed inside them.
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

  // Reacts to the committed `remaining` value to announce it (or ring the
  // bell once it hits zero) — effects only run once per real change.
  useEffect(() => {
    if (phase !== "running") return;

    if (remaining <= 0) {
      setPhase("done");
      playBellSound();
      return;
    }

    if (remaining <= ANNOUNCE_FROM && spokenRef.current !== remaining) {
      spokenRef.current = remaining;
      speakNumber(remaining);
    }
  }, [remaining, phase]);

  function handleStart() {
    spokenRef.current = null;
    setRemaining(game.timerSeconds ?? 0);
    setPhase("running");
  }

  function handleStopEarly() {
    clearInterval(intervalRef.current);
    cancelSpeech();
    setPhase("done");
  }

  return (
    <div className="sub-view sub-view--center">
      {phase === "ready" && (
        <>
          <p className="sub-view__timer-hint">
            When everyone's ready, start the {game.timerSeconds}-second timer.
          </p>
          <Button size="lg" fullWidth onClick={handleStart}>
            Start Timer
          </Button>
        </>
      )}

      {phase === "running" && (
        <>
          <div className="sub-view__timer anim-pop-in">{remaining}</div>
          <p className="sub-view__timer-hint">Go, go, go!</p>
          <Button variant="secondary" fullWidth onClick={handleStopEarly}>
            End Round Early
          </Button>
        </>
      )}

      {phase === "done" && (
        <>
          <div className="sub-view__timer sub-view__timer--done anim-pop-in">Time!</div>
          {game.hasWinner && (
            <p className="sub-view__timer-hint">Announce the winner, then continue.</p>
          )}
          <Button size="lg" fullWidth onClick={onFinish}>
            {isLast ? "Finish" : "Next Game"}
          </Button>
        </>
      )}
    </div>
  );
}
