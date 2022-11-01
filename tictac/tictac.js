const pr = console.log;
pr('hi');

function initGame() {
  // init cell
  document.querySelectorAll('.board .cell').forEach((c, i) => {
    c.setAttribute('id', i);
    c.onclick = (e) => {
      pr('id', e.target.id);
    };
  });
  // pr(document.querySelector('#\\36'));
  // pr(document.getElementById('6'));

  // init state
  board = Array(9);
  player = 'O';
  showStatus(board);
}

// current state
let board, player;

function showStatus(b) {
  let s = `player ${player}`;
  const e = document.getElementById('status');
  e.textContent = s;
}

// b -> 1 if X won, -1 if O won, 0 otherwise
function utility(b) {
  return 0;
}

function winner(b) {
  switch (utility(b)) {
    case 1:
      return 'X';
    case -1:
      return 'O';
    default:
      return null;
  }
}

// b -> X or O
function nextPlayer(p) {
  return p === 'O' ? 'X' : 'O';
}

// initGame();
