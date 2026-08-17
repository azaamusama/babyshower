import { useState } from "react";
import { games, totalGames } from "./data/games.js";
import Hero from "./components/Hero.jsx";
import GameMenu from "./components/GameMenu.jsx";
import GameView from "./components/GameView.jsx";
import CompletionScreen from "./components/CompletionScreen.jsx";

export default function App() {
  const [screen, setScreen] = useState("hero"); // hero | menu | game | complete
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  function handleStart() {
    setScreen("menu");
  }

  function handleSelectGame(index) {
    setCurrentGameIndex(index);
    setScreen("game");
  }

  function handleNextGame() {
    if (currentGameIndex >= totalGames - 1) {
      setScreen("complete");
    } else {
      setCurrentGameIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (currentGameIndex === 0) {
      setScreen("menu");
    } else {
      setCurrentGameIndex((i) => i - 1);
    }
  }

  function handleRestartAll() {
    setCurrentGameIndex(0);
    setScreen("hero");
  }

  return (
    <div className="app-shell">
      {screen === "hero" && <Hero onStart={handleStart} />}

      {screen === "menu" && (
        <GameMenu games={games} onSelectGame={handleSelectGame} />
      )}

      {screen === "game" && (
        <GameView
          key={games[currentGameIndex].id}
          game={games[currentGameIndex]}
          total={totalGames}
          onBack={handleBack}
          onNext={handleNextGame}
          isLast={currentGameIndex === totalGames - 1}
        />
      )}

      {screen === "complete" && <CompletionScreen onRestart={handleRestartAll} />}
    </div>
  );
}
