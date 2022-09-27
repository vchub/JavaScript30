const pr = console.log;
let { range, filter, map } = rxjs;

// range(1, 13)
//   .pipe(
//     filter((x) => x % 2 === 1),
//     map((x) => x + x),
//   )
//   .subscribe((x) => pr(x));

const sq = document.querySelector('#square');

function makeClickQueue(element) {
  const queue = [];
  element.addEventListener('click', (e) => {
    pr('e', e);
    const { clientX, clientY } = e;
    queue.push([clientX, clientY]);
  });
  return queue;
}

let clQueue = makeClickQueue(sq);

function* makeClickGen(element) {
  const queue = [];
  element.addEventListener('click', (e) => {
    // const { clientX, clientY } = e;
    const { x, y } = e;
    queue.push([clientX, clientY]);
  });
  while (true) {
    yield queue.shift();
  }
}

let clGen = makeClickGen(sq);

sq.click({ clientX: 10, clientY: 20 });
