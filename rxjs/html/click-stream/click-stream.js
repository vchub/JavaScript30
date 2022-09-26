const pr = console.log;
let { range, filter, map } = rxjs;

// range(1, 13)
//   .pipe(
//     filter((x) => x % 2 === 1),
//     map((x) => x + x),
//   )
//   .subscribe((x) => pr(x));

const sq = document.querySelector('#square');

function makeClickStream(element) {
  const queue = [];
  element.addEventListener('click', (e) => {
    const { clientX, clientY } = e;
    queue.push([clientX, clientY]);
  });
  return queue;
}

let clickcoords = makeClickStream(sq);
