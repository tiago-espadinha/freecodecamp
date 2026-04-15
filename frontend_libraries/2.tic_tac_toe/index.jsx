const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Check for winner or draw
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const isDraw = !winner && squares.every((sq) => sq !== null);

  function handleClick(i) {
    // Return early if there's a winner or the square is already filled
    if (winner || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Determine the status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Player Move: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game-wrapper">
      <h1 className="title">
        TIC<span>TAC</span>TOE
      </h1>

      <div className={`status-message ${winner ? "has-winner" : ""}`}>
        {status}
      </div>

      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            className={`square ${value ? value : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button id="reset" onClick={resetGame}>
        Restart System
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] };
    }
  }
  return null;
}
