import { useState } from "react";
import Button from "../ui/Button.jsx";
import RevealBanner from "../ui/RevealBanner.jsx";
import "./shared.css";

export default function StatementVote({ game, onFinish, isLast }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [revealed, setRevealed] = useState(false);

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

  const correctStatement = prompt.statements.find((s) => s.id === prompt.correctId);

  return (
    <div className="sub-view">
      <div className="sub-view__statements">
        {prompt.statements.map((statement) => {
          const isSelected = selectedId === statement.id;
          const isCorrectAnswer = statement.id === prompt.correctId;
          let stateClass = "";
          if (revealed && isCorrectAnswer) stateClass = "statement--correct";
          else if (revealed && isSelected && !isCorrectAnswer) stateClass = "statement--wrong";
          else if (isSelected) stateClass = "statement--selected";

          return (
            <button
              key={statement.id}
              className={`statement ${stateClass}`}
              onClick={() => handleSelect(statement.id)}
              disabled={revealed}
            >
              {statement.text}
            </button>
          );
        })}
      </div>

      {revealed && (
        <>
          <RevealBanner
            isCorrect={selectedId === prompt.correctId}
            correctLabel={correctStatement.text}
          />
          <Button size="lg" fullWidth onClick={handleContinue}>
            {isLastPrompt ? (isLast ? "Finish" : "Next Game") : "Next Statement"}
          </Button>
        </>
      )}
    </div>
  );
}
