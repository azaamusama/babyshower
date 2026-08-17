import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button.jsx";
import "./shared.css";

export default function TimerChallenge({ game, onFinish, isLast }) {
  const [phase, setPhase] = useState("ready"); // ready | running | done
  const [remaining, setRemaining] = useState(game.timerSeconds ?? 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (phase !== "running") return undefined;

    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          setPhase("done");
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [phase]);

  function handleStart() {
    setRemaining(game.timerSeconds ?? 0);
    setPhase("running");
  }

  function handleStopEarly() {
    clearInterval(intervalRef.current);
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
