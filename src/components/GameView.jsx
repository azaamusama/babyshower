import { useState } from "react";
import ProgressIndicator from "./ProgressIndicator.jsx";
import Button from "./ui/Button.jsx";
import StatementVote from "./views/StatementVote.jsx";
import TimerChallenge from "./views/TimerChallenge.jsx";
import MoreLikelyQuestion from "./views/MoreLikelyQuestion.jsx";
import FindItem from "./views/FindItem.jsx";
import "./GameView.css";

const viewByType = {
  "vote-lie": StatementVote,
  "timer-challenge": TimerChallenge,
  "more-likely": MoreLikelyQuestion,
  "find-item": FindItem,
};

export default function GameView({ game, total, onBack, onNext, isLast }) {
  const [phase, setPhase] = useState("setup");
  const [resetKey, setResetKey] = useState(0);
  const badgeLabel = game.isStarter ? "Starter" : game.badge;

  const ActiveView = viewByType[game.type];

  function handleRestart() {
    setPhase("setup");
    setResetKey((k) => k + 1);
  }

  return (
    <div className="game-view anim-fade-in-up">
      <div className="game-view__topbar">
        <button className="game-view__back" onClick={onBack}>
          ← Back
        </button>
        <div className="game-view__topbar-right">
          <button className="game-view__restart" onClick={handleRestart}>
            Restart
          </button>
          <button className="game-view__next" onClick={onNext}>
            {isLast ? "Finish" : "Next"} →
          </button>
        </div>
      </div>

      <ProgressIndicator current={game.order} total={total} />

      <div className="card game-view__card">
        <div className="game-view__heading">
          {badgeLabel && <span className="tag-example">{badgeLabel}</span>}
          <h2 className="game-view__title">{game.title}</h2>
          <p className="game-view__subtitle">{game.subtitle}</p>
        </div>

        {phase === "setup" && (
          <div className="game-view__setup anim-fade-in-up">
            <p className="game-view__purpose">{game.purpose}</p>

            <Button size="lg" fullWidth onClick={() => setPhase("active")}>
              {game.hasTimer ? "Get Ready" : "Begin"}
            </Button>
          </div>
        )}

        {phase === "active" && ActiveView && (
          <ActiveView
            key={resetKey}
            game={game}
            onFinish={onNext}
            isLast={isLast}
          />
        )}
      </div>
    </div>
  );
}
