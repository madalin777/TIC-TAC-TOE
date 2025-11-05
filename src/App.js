import React, { useState, useEffect } from "react";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [, setGameOver] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);

  const winner = calculateWinner(board);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const win = calculateWinner(newBoard);
    if (win) {
      setScore((prev) => ({
        ...prev,
        [win]: prev[win] + 1,
      }));
      setLastWinner(win);
      setGameOver(true);
    }
  };

  const handleNewRound = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setScore({ X: 0, O: 0 });
    setLastWinner(null);
    setGameOver(false);
  };

  useEffect(() => {
    if (lastWinner) {
      const el = document.querySelector(`.player-${lastWinner}`);
      if (el) {
        el.classList.add("pulse");
        setTimeout(() => el.classList.remove("pulse"), 1000);
      }
    }
  }, [lastWinner]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 TIC-TAC-TOE 🎮</h1>

      {/* SCOREBOARD NOU */}
      <div style={styles.scoreBoard}>
        <div className="player-X" style={styles.playerX}>
          Player X
        </div>

        <div style={styles.scoreText}>
          Player X: {score.X} <span style={styles.separator}>|</span> Player O: {score.O}
        </div>

        <div className="player-O" style={styles.playerO}>
          Player O
        </div>
      </div>

      <p style={styles.nextPlayer}>
        Next player:{" "}
        <span style={xIsNext ? styles.playerX : styles.playerO}>
          {xIsNext ? "Player X" : "Player O"}
        </span>
      </p>

      <div style={styles.board}>
        {board.map((square, i) => (
          <button
            key={i}
            style={{
              ...styles.square,
              color:
                square === "X"
                  ? styles.playerX.color
                  : square === "O"
                  ? styles.playerO.color
                  : "#fff",
            }}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>

      <div style={styles.buttons}>
        <button style={styles.newRound} onClick={handleNewRound}>
          🔁 New round
        </button>
        <button style={styles.reset} onClick={handleResetGame}>
          ♻️ Reset full game
        </button>
      </div>

      <style>
        {`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { background-color: #000; height: 100%; overflow-x: hidden; }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }

          .pulse { animation: pulse 1s ease; }

          button:hover { transform: scale(1.1); transition: 0.2s; }
        `}
      </style>
    </div>
  );
}

/* === CALCUL WIN === */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/* === STILURI === */
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "52px",
    color: "#fff",
    marginBottom: "10px",
    textShadow: "0 0 10px #ff4b5c",
  },
  scoreBoard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    fontSize: "30px",
    marginBottom: "25px",
  },
  playerX: { color: "#ff4b5c", fontWeight: "bold", textShadow: "0 0 10px #ff4b5c" },
  playerO: { color: "#00ffcc", fontWeight: "bold", textShadow: "0 0 10px #00ffcc" },
  scoreText: { fontSize: "36px", fontWeight: "600" },
  separator: { margin: "0 8px", color: "#888" },
  nextPlayer: { fontSize: "22px", marginBottom: "20px" },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 120px)",
    gap: "15px",
  },
  square: {
    width: "120px",
    height: "120px",
    fontSize: "48px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "14px",
    border: "2px solid #fff",
    backgroundColor: "#111",
  },
  buttons: { display: "flex", gap: "15px", marginTop: "30px" },
  newRound: {
    backgroundColor: "#00ffcc",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    color: "#000",
    fontWeight: "bold",
  },
  reset: {
    backgroundColor: "#ff4b5c",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
  },
};
