import GameCard from "./GameCard.jsx";
import "./GameMenu.css";

export default function GameMenu({ games, onSelectGame }) {
  return (
    <div className="game-menu">
      <p className="eyebrow">Six games, one celebration</p>
      <h2 className="game-menu__title">Choose a game to play</h2>
      <p className="game-menu__hint">
        Play them in order for the best flow, starting with the icebreaker.
      </p>
      <div className="game-menu__list">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onSelect={() => onSelectGame(game.order - 1)} />
        ))}
      </div>
    </div>
  );
}
