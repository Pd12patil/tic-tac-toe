const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let currentPlayer = "X";
let gameOver = false;

function renderBoard() {
  const allBoxes = document.querySelectorAll(".box");
  allBoxes.forEach((boxElement, i) => {
    if (board[i] !== -1) {
      boxElement.textContent = board[i];
    } else {
      boxElement.textContent = "";
    }
  });
}

function selectBox(boxNumber) {
  if (board[boxNumber] !== -1) {
    alert("Box already selected!");
    return;
  }

  if (gameOver) {
    alert("Game is over!");
    return;
  }

  board[boxNumber] = currentPlayer;
  renderBoard();

  if (checkForWinner()) {
    document.getElementById(
      "winnerMessage"
    ).textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (board.every((cell) => cell !== -1)) {
    // document.getElementById('winnerMessage').textContent = "It's a tie!";
    alert("It's a tie!");
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("currentPlayer").innerText = currentPlayer;
}

function resetBoard() {
  board.fill(-1);
  gameOver = false;
  renderBoard();
  currentPlayer = "X";
  document.getElementById("currentPlayer").innerText = currentPlayer;
  document.getElementById("winnerMessage").textContent = "";
}

function checkForWinner() {
  const winningPlayers = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const Players of winningPlayers) {
    const [a, b, c] = Players;
    if (board[a] !== -1 && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

renderBoard();
