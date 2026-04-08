import React, { useState } from "react";

const choices = ["Rock", "Paper", "Scissors"];

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [rounds, setRounds] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const getResult = (player, computer) => {
    if (player === computer) return "Draw";
    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      return "You Win";
    }
    return "Computer Wins";
  };

  const handleClick = (choice) => {
    const computer = getComputerChoice();
    const gameResult = getResult(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);
    setRounds(rounds + 1);

    // streak logic
    if (gameResult === "You Win") {
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    // history
    setHistory([
      ...history,
      { player: choice, computer: computer, result: gameResult },
    ]);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setRounds(0);
    setHistory([]);
    setStreak(0);
  };

  return (
    <div className="container">
      <h1>Rock Paper Scissors</h1>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleClick(choice)}>
            {choice}
          </button>
        ))}
      </div>

      <div className="info">
        <p>Player: {playerChoice}</p>
        <p>Computer: {computerChoice}</p>
        <h2>{result}</h2>
      </div>

      <div className="stats">
        <p>Rounds Played: {rounds}</p>
        <p>Win Streak: {streak}</p>
      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>

      <div className="history">
        <h3>Move History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              Round {index + 1}: You ({item.player}) vs Computer ({item.computer}) → {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
