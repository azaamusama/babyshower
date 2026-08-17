import "./RevealBanner.css";

export default function RevealBanner({ isCorrect, correctLabel, note }) {
  return (
    <div
      className={`reveal-banner anim-pop-in ${
        isCorrect === false ? "reveal-banner--miss" : "reveal-banner--hit"
      }`}
    >
      <span className="reveal-banner__icon" aria-hidden="true">
        {isCorrect === false ? "✕" : "✓"}
      </span>
      <div>
        <p className="reveal-banner__title">
          {isCorrect === false ? "Not quite!" : "That's it!"}
        </p>
        {correctLabel && (
          <p className="reveal-banner__detail">Answer: {correctLabel}</p>
        )}
        {note && <p className="reveal-banner__detail">{note}</p>}
      </div>
    </div>
  );
}
