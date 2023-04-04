const PLAYER_SYMBOL = "X";
const COMPUTER_SYMBOL = "O";

const SYMBOLS = {
  [PLAYER_SYMBOL]: "X",
  [COMPUTER_SYMBOL]: "O",
  "": "&nbsp;",
};

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let gameOver = false;
let winner = null;

const table = document.getElementById("board");
const status = document.getElementById("status");
const newGameButton = document.getElementById("newGameButton");
const handleCellClick = (row, col) => {
  if (gameOver || board[row][col] !== "") {
    return;
  }

  board[row][col] = PLAYER_SYMBOL;
  render();

  if (checkWin()) {
    gameOver = true;
    winner = PLAYER_SYMBOL;
  } else if (checkTie()) {
    gameOver = true;
  } else {
    let [r, c] = getComputerMove();
    board[r][c] = COMPUTER_SYMBOL;
    render();

    if (checkWin()) {
      gameOver = true;
      winner = COMPUTER_SYMBOL;
    } else if (checkTie()) {
      gameOver = true;
    }
  }

  updateStatus();
};

const render = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      table.rows[i].cells[j].innerHTML = SYMBOLS[board[i][j]];
    }
  }
};

const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ""
    ) {
      return true;
    }
  }

  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j] &&
      board[0][j] !== ""
    ) {
      return true;
    }
  }

  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    return true;
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    return true;
  }

  return false;
};

const checkTie = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }

  return true;
};

const getComputerMove = () => {
  let row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (board[row][col] !== "");

  return [row, col];
};

const updateStatus = () => {
  const status = document.getElementById("status");

  if (winner) {
    status.innerHTML = `Победил ${SYMBOLS[winner]}!`;
    if (winner === PLAYER_SYMBOL) {
      status.className = "won";
    } else {
      status.className = "lost";
    }
  } else if (gameOver) {
    status.innerHTML = "Ничья!";
    status.className = "tie";
  } else {
    status.innerHTML = `Ходит ${SYMBOLS[PLAYER_SYMBOL]}`;
    status.className = "";
  }
};

const startNewGame = () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  gameOver = false;
  winner = null;

  render();

  updateStatus();
};

table.addEventListener("click", (event) => {
  const row = event.target.parentNode.rowIndex;
  const col = event.target.cellIndex;
  handleCellClick(row, col);
});

newGameButton.addEventListener("click", startNewGame);

startNewGame();
