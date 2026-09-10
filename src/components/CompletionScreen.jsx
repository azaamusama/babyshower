import Button from "./ui/Button.jsx";
import Motif from "./ui/Motif.jsx";
import "./CompletionScreen.css";

const confettiColors = ["var(--gold)", "var(--brown-deep)", "var(--sage-deep)"];

export default function CompletionScreen({ onRestart }) {
  const confetti = Array.from({ length: 10 });

  return (
    <div className="completion anim-fade-in-up">
      <div className="completion__confetti" aria-hidden="true">
        {confetti.map((_, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${(i / confetti.length) * 100}%`,
              background: confettiColors[i % confettiColors.length],
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <Motif shape="balloon" size={48} className="completion__icon anim-float" />
      <h2 className="completion__title">That's a wrap!</h2>
      <p className="completion__text">
        Thank you for playing and celebrating with us. Here's to the little
        one on the way!
      </p>
      <Button variant="secondary" onClick={onRestart}>
        Restart All Games
      </Button>
    </div>
  );
}
