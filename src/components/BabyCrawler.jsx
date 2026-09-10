import { useEffect, useMemo, useState } from "react";
import "./BabyCrawler.css";

const STEP_MS = 650;
const COLORS = ["--brown-deep", "--gold-deep", "--sage-deep", "--gold"];

function BabySilhouette() {
  return (
    <svg
      className="baby-crawler__svg"
      viewBox="0 0 120 70"
      aria-hidden="true"
    >
      <ellipse className="baby-crawler__limb" cx="26" cy="54" rx="16" ry="9" />
      <ellipse className="baby-crawler__limb" cx="40" cy="50" rx="10" ry="7" />
      <ellipse className="baby-crawler__limb" cx="88" cy="54" rx="11" ry="8" />
      <ellipse className="baby-crawler__limb" cx="68" cy="58" rx="13" ry="8" />
      <ellipse className="baby-crawler__body" cx="58" cy="36" rx="34" ry="20" />
      <path
        className="baby-crawler__band"
        d="M28,32 Q58,14 88,32"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle className="baby-crawler__head" cx="96" cy="20" r="17" />
      <path
        className="baby-crawler__tuft"
        d="M90,5 Q94,-3 98,4"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
      const jitterX = (seededRandom(i * 2 + 1) - 0.5) * (80 / cols);
      const jitterY = (seededRandom(i * 2 + 2) - 0.5) * (60 / rows);
      const rotate = (seededRandom(i * 3 + 3) - 0.5) * 18;
      const flip = seededRandom(i * 5 + 7) > 0.5;
      return {
        left: Math.min(94, Math.max(6, baseLeft + jitterX)),
        top: Math.min(88, Math.max(4, baseTop + jitterY)),
        rotate,
        flip,
        color: `var(${COLORS[i % COLORS.length]})`,
      };
    });
  }, [count]);
}

export default function BabyCrawler({ names }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const layout = useScatterLayout(names.length);

  useEffect(() => {
    if (revealedCount >= names.length) return undefined;
    const delay = revealedCount === 0 ? 300 : STEP_MS;
    const t = setTimeout(() => setRevealedCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [revealedCount, names.length]);

  if (names.length === 0) return null;

  return (
    <div className="baby-crawler">
      <p className="baby-crawler__eyebrow eyebrow">Crawling in to celebrate</p>
      <div className="baby-crawler__stage">
        {names.map((name, i) => {
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
              <span className="baby-crawler__name">{name}</span>
              <div
                className="baby-crawler__flip"
                style={{ "--flip": spot.flip ? -1 : 1 }}
              >
                <div className="baby-crawler__figure">
                  <BabySilhouette />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
