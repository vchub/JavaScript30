const pr = console.log;

// current state
const world = { board: null, player: null };

function newGame() {
  // init cell
  document.querySelectorAll('.board .cell').forEach((c, i) => {
    c.setAttribute('id', i);
    c.onclick = (e) => onclick(i);
    c.textContent = '';
  });

  world.board = Array(9).fill(null);
  world.player = 'O';
  showStatus(world);
}

function onclick(i) {
  const world1 = makeMove(world, i);
  if (world1 && !terminal(world.board)) {
    setTimeout(() => aiMove(world1), 300);
  }
}

function makeMove(world, i) {
  if (world.board[i] != null) return null;
  if (terminal(world.board)) return null;
  world.board[i] = world.player;
  markCell(i, world.player);

  // pr('b', board);
  world.player = nextPlayer(world.player);
  showStatus(world);
  return world;
}

function markCell(i, player) {
  document.getElementById(String(i)).textContent = player;
}

function showStatus({ board, player }) {
  let s = `player ${player}`,
    won = winner(board);
  if (won) {
    s += `, won ${won}`;
  }
  if (terminal(board)) {
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

// find an optimum move and play
function aiMove(w) {
  const bestC = minMax(w.board, w.player);
  return makeMove(w, bestC[1]);
  // return randMove(w);
}

function randMove(w) {
  const cs = filterNull(w.board);
  const i = randSample(cs);
  return makeMove(w, i);
}

function randSample(xs) {
  const i = Math.floor(Math.random() * xs.length);
  pr('i', i);
  return xs[i];
}

function filterNull(b) {
  return b.reduce((acc, c, i) => {
    if (c == null) {
      acc.push(i);
    }
    return acc;
  }, []);
}

const scoreCache = new Map();
const cacheKey = (b, p, i) => JSON.stringify([b, p, i]);

// board, player, cell_i -> Number (score for move into cell_i)
function score(b, p, i) {
  // check cache
  const k = cacheKey(b, p, i);
  if (scoreCache.has(k)) return scoreCache.get(k);

  if (terminal(b)) return utility(b);

  const cs = filterNull(b),
    b1 = [...b];
  b1[i] = p;

  const res = cs.reduce((acc, c) => (acc += score(b1, nextPlayer(p), c)), 0);
  scoreCache.set(k, res);
  return res;
}

// board, player -> cell with max score
function minMax(b, p) {
  const ss = filterNull(b).map((c) => [score(b, p, c), c]);
  const res = ss.reduce((acc, x) => (acc[0] < x[0] ? x : acc));
  pr('res', res);
  return res;
}
