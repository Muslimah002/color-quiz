import { useEffect, useState } from "react";
import Header from "./component/Header";

const ColorGames = [
  "green", "yellow", "blue", "red", "orange", "pink", "brown", "cyan", "lilac", "purple",
  "black", "coral", "indigo", "magenta", "lime", "maroon", "gold", "silver", "indigo", "white"
];

const colorsLength = ColorGames.length;

function App() {
  return (
    <div className="container">
      <Header />
      <ColorGameSelection />
    </div>
  );
}



function ColorGameSelection() {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStatus, setGameStatus] = useState("Guess the colors");
  const [gameOver, setGameOver] = useState(false);

  function generateNewGame() {  
    if (round > 20) {
      setGameOver(true);
      setGameStatus(`You've done a great job!`);
      setColorOptions([]);

      if (score < 10) {
        setGameStatus("Fair, Try Again");
      } else {
        setGameStatus("Great! You’ve done well 🎉");
      }
      return;
    }

    const shuffledColors = [...ColorGames].sort(() => Math.random() - 0.5);
    const selectedOptions = shuffledColors.slice(0, 6);
    const targetRandomColor = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];

    setTargetColor(targetRandomColor);
    setColorOptions(selectedOptions);
    setGameStatus("Guess the correct color");
  }

  function handleGuessOption(color) {
    if (color === targetColor) {
      setGameStatus("Correct 🎉");
      setScore((prevScore) => prevScore + 1);
    } else {
      setGameStatus("Wrong! Try Again ❌");
    }

    setRound((prevRound) => prevRound + 1);
    setTimeout(generateNewGame, 700);
  }

  function resetGame() {
    setScore(0);
    setRound(1);
    setGameOver(false);
    generateNewGame();
  }

  useEffect(() => {
    generateNewGame();
  }, []);

  return (
    <div className="gameGuess">
      {gameOver ? (
        <div>{gameStatus}</div>
      ) : (
        <div  >
          <div
            className="guess-option"
            data-testid="colorBox"
            style={{
              width: "270px",
              height: "150px",
              backgroundColor: targetColor,
              border: "2px solid black",
              animation: "blink 3s infinite",
            }}
          ></div>
        </div>
      )}

      <div className="score-option">
        <p data-testid='gameStatus'>{gameStatus}</p>
        <p data-testid='score'>Score: {score} / {colorsLength}</p>
      </div>

      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            style={{ width: "100px", height: "100px", backgroundColor: color, border: "none" }}
            onClick={() => handleGuessOption(color)}
          ></button>
        ))}
      </div>

      {gameOver && (
        <button data-testid='newGameButton' className="restart-button"  onClick={resetGame}>Restart Game</button>
      )}
    </div>
  );
}

export default App;
