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

// from world state let 2 ai agents play against each other
function aiVsAi(world) {
  world = aiMove(world);
  if (!world) return null;
  setTimeout(() => aiVsAi(world), 150);
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
  // const bestC = bruteForce(w.board, w.player);
  const bestC = minMax(w.board, w.player);
  pr('bestC', bestC, w.player);
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

const Cash = new Map();
const cacheKey = (b, p, i) => JSON.stringify([b, p, i]);

// board, player, cell_i -> Number (score for move into cell_i)
function score(b, p, i) {
  // check cache
  const k = cacheKey(b, p, i);
  if (Cash.has(k)) return Cash.get(k);

  if (terminal(b)) return utility(b);

  const cs = filterNull(b),
    b1 = [...b];
  b1[i] = p;

  const res = cs.reduce((acc, c) => (acc += score(b1, nextPlayer(p), c)), 0);
  Cash.set(k, res);
  return res;
}

// search through all possible acts and assign every act a score = number of
// ways to win through this act.
// board, player -> cell with max score
function bruteForce(b, p) {
  const ss = filterNull(b).map((c) => [score(b, p, c), c]);
  const res = ss.reduce((acc, x) => (acc[0] < x[0] ? x : acc));
  pr('res', res);
  return res;
}

// search for an act with the best winning score - max for X and min for O
// assume that both players choose the best act at every step
// board, player -> (score, action)
// function minMax(b, p) {
//   if (terminal(b)) return [utility(b), null];

//   const key = JSON.stringify(b);
//   if (Cash.has(key)) return Cash.get(key);

//   let res = null;
//   const acts = filterNull(b);
//   if (p === 'X') {
//     const scoreActs = acts.map((a) => [minMax(result(b, a, 'X'), 'O'), a]);
//     res = max(scoreActs);
//   } else {
//     const scoreActs = acts.map((a) => [minMax(result(b, a, 'O'), 'X'), a]);
//     res = min(scoreActs);
//   }
//   Cash.set(key, res);
//   return res;
// }

function minMax(b, p) {
  if (p === 'X') return maxPlayer(b, Infinity);
  else return minPlayer(b, -Infinity);
}

// best act for 'O' search
// board, Num -> [score, act]
function minPlayer(b, breakVal) {
  if (terminal(b)) return [utility(b), null];

  const key = JSON.stringify(b);
  if (Cash.has(key)) return Cash.get(key);

  let res = [Infinity, null];

  for (const a of filterNull(b)) {
    const [score, _] = maxPlayer(result(b, a, 'O'), res[0]);
    if (score < res[0]) {
      res = [score, a];
    }
    if (score < breakVal) break;
  }
  Cash.set(key, res);
  return res;
}

// best act for 'X' search
// board, Num -> [score, act]
function maxPlayer(b, breakVal) {
  if (terminal(b)) return [utility(b), null];

  const key = JSON.stringify(b);
  if (Cash.has(key)) return Cash.get(key);

  let res = [-Infinity, null];

  for (const a of filterNull(b)) {
    const [score, _] = minPlayer(result(b, a, 'X'), res[0]);
    if (score > res[0]) {
      res = [score, a];
    }
    if (score > breakVal) break;
  }
  // pr('X', res, breakVal);
  Cash.set(key, res);
  return res;
}

// // board -> [score, act]
// function maxValue(b) {
//   const acts = filterNull(b);
//   const scoreActs = acts.map((a) => [minValue(result(b, a, 'X')), a]);
//   return max(scoreActs);
// }

// [Pair], (Pair, Pair -> bool) -> Pair
function max(xs, pred = (a, b) => a[0] >= b[0]) {
  return xs.reduce((acc, x) => (pred(acc, x) ? acc : x));
}
const min = (xs) => max(xs, (a, b) => a[0] <= b[0]);

// board, act, player -> board
function result(b, a, p) {
  const b1 = [...b];
  b1[a] = p;
  return b1;
}
