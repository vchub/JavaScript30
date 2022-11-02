const pr = console.log;

function initGame() {
  // init cell
  document.querySelectorAll('.board .cell').forEach((c, i) => {
    c.setAttribute('id', i);
    c.onclick = (e) => onclick(e, i);
  });
  // pr(document.querySelector('#\\36'));
  // pr(document.getElementById('6'));

  // init state
  newGame();
}

// current state
let board, player;

function newGame() {
  board = Array(9).fill(null);
  player = nextPlayer(player);
  showStatus(board);
}

function onclick(e, i) {
  if (board[i] != null) return;
  if (terminal(board)) return;
  board[i] = player;
  showMove(e, i, player);

  // pr('b', board);
  player = nextPlayer(player);
  showStatus(board);
}

function showMove(e, i, player) {
  const el = e != null ? e.target : document.getElementById(String(i));
  el.textContent = player;
}

function showStatus(b) {
  let s = `player ${player}`,
    won = winner(b);
  if (won) {
    s += `, won ${won}`;
  }
  if (terminal(b)) {
    s += ', game over';
  }

  const e = document.getElementById('status');
  e.textContent = s;
}

// b -> 1 if X won, -1 if O won, 0 otherwise
function utility(b) {
  switch (winner(b)) {
    case 'X':
      return 1;
    case 'O':
      return -1;
    default:
      return 0;
  }
}

function winner(b) {
  const won = (ids, p) => ids.every((x) => b[x] === p);

  for (const ids of [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]) {
    if (won(ids, 'X')) return 'X';
    if (won(ids, 'O')) return 'O';
  }
  return null;
}

// b -> T if game is over, F otherwise
function terminal(b) {
  return winner(b) != null || b.every((x) => x == 'O' || x == 'X');
}

// b -> X or O
function nextPlayer(p) {
  return p === 'O' ? 'X' : 'O';
}

// initGame();
