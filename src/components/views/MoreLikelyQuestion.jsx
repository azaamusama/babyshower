import { useState } from "react";
import Button from "../ui/Button.jsx";
import RevealBanner from "../ui/RevealBanner.jsx";
import "./shared.css";

export default function MoreLikelyQuestion({ game, onFinish, isLast }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [revealed, setRevealed] = useState(false);

  if (game.prompts.length === 0) {
    return (
      <div className="sub-view">
        <p className="sub-view__example-note">
          No questions added yet — add some to this game in src/data/games.js.
        </p>
        <Button size="lg" fullWidth onClick={onFinish}>
          {isLast ? "Finish" : "Next Game"}
        </Button>
      </div>
    );
  }

  const prompt = game.prompts[promptIndex];
  const isLastPrompt = promptIndex === game.prompts.length - 1;

  function handleSelect(id) {
    if (revealed) return;
    setSelectedId(id);
    setRevealed(true);
  }

  function handleContinue() {
    if (!isLastPrompt) {
      setPromptIndex((i) => i + 1);
      setSelectedId(null);
      setRevealed(false);
    } else {
      onFinish();
    }
  }

  const correctChoice = prompt.choices.find((c) => c.id === prompt.correctId);

  return (
    <div className="sub-view">
      {prompt.isExample && (
        <p className="sub-view__example-note">Example question — host: replace with your own.</p>
      )}
      <p className="sub-view__prompt-text">{prompt.text}</p>

      <div className="sub-view__choices sub-view__choices--pair">
        {prompt.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const isCorrectAnswer = choice.id === prompt.correctId;
          let stateClass = "";
          if (revealed && isCorrectAnswer) stateClass = "choice--correct";
          else if (revealed && isSelected && !isCorrectAnswer) stateClass = "choice--wrong";

          return (
            <button
              key={choice.id}
              className={`choice ${stateClass}`}
              onClick={() => handleSelect(choice.id)}
              disabled={revealed}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      {revealed && (
        <>
          <RevealBanner
            isCorrect={selectedId === prompt.correctId}
            correctLabel={correctChoice.label}
          />
          <Button size="lg" fullWidth onClick={handleContinue}>
            {isLastPrompt ? (isLast ? "Finish" : "Next Game") : "Next Question"}
          </Button>
        </>
      )}
    </div>
  );
}
