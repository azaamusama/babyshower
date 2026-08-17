import "./ProgressIndicator.css";

export default function ProgressIndicator({ current, total }) {
  const pct = ((current) / total) * 100;
  return (
    <div className="progress">
      <div className="progress__row">
        <span className="progress__label">
          Game {current} of {total}
        </span>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
