import { useEffect, useMemo, useState } from "react";
import "./BabyCrawler.css";

const STEP_MS = 650;
const COLORS = ["--brown-deep", "--gold-deep", "--sage-deep", "--gold"];

// Deterministic pseudo-random in [0, 1), seeded so layout is stable across renders.
function seededRandom(seed) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

// Positions each friend by their explicit `row` group, spacing friends
// within a row evenly and rows evenly, so callers control who's grouped
// with whom via friends.js rather than an automatic square grid.
function useRowLayout(friends) {
  return useMemo(() => {
    const rowIndexes = [...new Set(friends.map((f) => f.row ?? 0))].sort(
      (a, b) => a - b
    );
    const totalRows = rowIndexes.length;
    const rowPosition = new Map(rowIndexes.map((r, idx) => [r, idx]));
    const seenPerRow = new Map();
    const countPerRow = new Map();
    friends.forEach((f) => {
      const r = f.row ?? 0;
      countPerRow.set(r, (countPerRow.get(r) ?? 0) + 1);
    });

    return friends.map((friend, i) => {
      const r = friend.row ?? 0;
      const posInRow = seenPerRow.get(r) ?? 0;
      seenPerRow.set(r, posInRow + 1);
      const itemsInRow = countPerRow.get(r);
      const rowIdx = rowPosition.get(r);

      const baseLeft = ((posInRow + 0.5) / itemsInRow) * 100;
      const baseTop = ((rowIdx + 0.5) / totalRows) * 100;
      const jitterX = (seededRandom(i * 2 + 1) - 0.5) * (16 / itemsInRow);
      const jitterY = (seededRandom(i * 2 + 2) - 0.5) * (10 / totalRows);
      const rotate = (seededRandom(i * 3 + 3) - 0.5) * 8;

      return {
        left: Math.min(94, Math.max(6, baseLeft + jitterX)),
        top: Math.min(90, Math.max(6, baseTop + jitterY)),
        rotate,
        color: `var(${COLORS[i % COLORS.length]})`,
      };
    });
  }, [friends]);
}

export default function BabyCrawler({ friends }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const layout = useRowLayout(friends);

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
