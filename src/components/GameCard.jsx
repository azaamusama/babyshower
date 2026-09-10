import "./GameCard.css";

export default function GameCard({ game, onSelect }) {
  const badgeLabel = game.isStarter ? "Starter" : game.badge;

  return (
    <button className="game-card anim-fade-in-up" onClick={onSelect}>
      <span className="game-card__number">
        {String(game.order).padStart(2, "0")}
      </span>
      <div className="game-card__body">
        <div className="game-card__heading">
          <h3 className="game-card__title">{game.title}</h3>
          {badgeLabel && <span className="tag-example game-card__badge">{badgeLabel}</span>}
        </div>
        <p className="game-card__desc">{game.shortDescription}</p>
      </div>
      <span className="game-card__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}
