import { useEffect, useState } from "react";
import "./BabyCrawler.css";

const STEP_MS = 250;
const COLORS = ["--brown-deep", "--gold-deep", "--sage-deep", "--gold"];

export default function BabyCrawler({ friends }) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (revealedCount >= friends.length) return undefined;
    const delay = revealedCount === 0 ? 300 : STEP_MS;
    const t = setTimeout(() => setRevealedCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [revealedCount, friends.length]);

  if (friends.length === 0) return null;

  const columns = Math.ceil(friends.length / 2);

  return (
    <div className="baby-crawler">
      <p className="baby-crawler__eyebrow eyebrow">Crawling in to celebrate</p>
      <div
        className="baby-crawler__stage"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {friends.map((friend, i) => (
          <div
            key={i}
            className={`baby-crawler__unit${i < revealedCount ? " is-revealed" : ""}`}
            style={{ "--baby-color": `var(${COLORS[i % COLORS.length]})` }}
          >
            <span className="baby-crawler__name">{friend.name}</span>
            <div
              className="baby-crawler__head"
              style={
                friend.photo ? { backgroundImage: `url(${friend.photo})` } : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
