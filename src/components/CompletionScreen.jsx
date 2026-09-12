import Button from "./ui/Button.jsx";
import Motif from "./ui/Motif.jsx";
import { friends } from "../data/friends.js";
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

      <div className="completion__guests">
        {friends.map((friend, i) => (
          <div
            key={i}
            className="completion__guest anim-pop-in"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className="completion__guest-face"
              style={
                friend.photo ? { backgroundImage: `url(${friend.photo})` } : undefined
              }
            />
            <span className="completion__guest-name">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
