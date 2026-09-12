import { useEffect, useMemo, useState } from "react";
import "./BabyCrawler.css";

const STEP_MS = 650;
const COLORS = ["--brown-deep", "--gold-deep", "--sage-deep", "--gold"];

// Deterministic pseudo-random in [0, 1), seeded so layout is stable across renders.
function seededRandom(seed) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

function useScatterLayout(count) {
  return useMemo(() => {
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseLeft = ((col + 0.5) / cols) * 100;
      const baseTop = ((row + 0.5) / rows) * 100;
      const jitterX = (seededRandom(i * 2 + 1) - 0.5) * (40 / cols);
      const jitterY = (seededRandom(i * 2 + 2) - 0.5) * (30 / rows);
      const rotate = (seededRandom(i * 3 + 3) - 0.5) * 10;
      return {
        left: Math.min(94, Math.max(6, baseLeft + jitterX)),
        top: Math.min(88, Math.max(4, baseTop + jitterY)),
        rotate,
        color: `var(${COLORS[i % COLORS.length]})`,
      };
    });
  }, [count]);
}

export default function BabyCrawler({ friends }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const layout = useScatterLayout(friends.length);

  useEffect(() => {
    if (revealedCount >= friends.length) return undefined;
    const delay = revealedCount === 0 ? 300 : STEP_MS;
    const t = setTimeout(() => setRevealedCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [revealedCount, friends.length]);

  if (friends.length === 0) return null;

  return (
    <div className="baby-crawler">
      <p className="baby-crawler__eyebrow eyebrow">Crawling in to celebrate</p>
      <div className="baby-crawler__stage">
        {friends.map((friend, i) => {
          const spot = layout[i];
          return (
            <div
              key={i}
              className={`baby-crawler__unit${i < revealedCount ? " is-revealed" : ""}`}
              style={{
                left: `${spot.left}%`,
                top: `${spot.top}%`,
                "--rotate": `${spot.rotate}deg`,
                "--baby-color": spot.color,
              }}
            >
              <span className="baby-crawler__name">{friend.name}</span>
              <div
                className="baby-crawler__head"
                style={
                  friend.photo
                    ? { backgroundImage: `url(${friend.photo})` }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
