const pr = console.log;
let { interval, from, of, range, filter, map, Observable, Subscribe } = rxjs;

const randInt = (n) => Math.floor(Math.random() * n);
const randIntIJ = (i, j) => i + Math.floor(Math.random() * (j - i));

const width = 100,
  height = 100,
  n = 3,
  period = 1000;

// components ====================
// const Screen = ({ width, height, n, period }) => {
//   const elm = document.createElement('div');
//   elm.style = `width:${width}px; height:${height}px; border: solid black`;
//   return elm;
// };

const Spot = ({ left, top, size, color }) => {
  const elm = document.createElement('div');
  elm.style = `width:${size}%; height:${size}%; border: solid ${color};
	border-radius:50%;
	position: relative;
	left: ${left}%;
	top: ${top}%`;
  return elm;
};

// run ====================

const run = () => {
  const scr = document.querySelector('#screen');
  window.scr = scr;

  // values in %
  let size = 20,
    left = () => randIntIJ(0, 100 - size),
    top = (i) => randIntIJ(-i * size, 100 - (i + 1) * size),
    colors = ['red', 'blue', 'yellow', 'black', 'green', 'purple'],
    randColor = () => colors[randInt(colors.length)];

  interval(1000)
    .pipe(
      map((i) => {
        const res = Spot({
          left: left(),
          top: top(i),
          size: size,
          color: randColor(),
        });
        pr('res', res);
        return res;
      }),
    )
    .subscribe((spot) => scr.append(spot));

  interval(1500).subscribe(() => randRemoveSpot(scr));
};

function randRemoveSpot(parent) {
  const spots = parent.children;
  pr('spot', spot);
  if (spots.length > 0) parent.removeChild(spots[randInt(spots.length)]);
}

const MM = { randIntIJ, Spot, run };
