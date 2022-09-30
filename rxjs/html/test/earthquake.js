const pr = console.log;
let { take, interval, from, of, range, filter, map, Observable, Subscribe } =
  rxjs;

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
  elm.style = `width:${size}px; height:${size}px; border: solid ${color};
	border-radius:50%;
	position: absolute;
	left: ${left}px;
	top: ${top}px;`;
  return elm;
};

function randRemoveSpot(parent) {
  const spots = parent.children;
  // pr('spot', spot);
  if (spots.length > 2) parent.removeChild(spots[randInt(spots.length)]);
}

// run ====================

const run = () => {
  const scr = document.querySelector('#screen');
  window.scr = scr;

  // values in px
  let size = 20,
    // left = () => randIntIJ(0, 100 - size),
    // top = (i) => randIntIJ(-i * size, 100 - (i + 1) * size),
    left = () =>
      randIntIJ(scr.offsetLeft, scr.offsetWidth - scr.offsetLeft - size),
    top = () => randIntIJ(scr.offsetTop, scr.offsetHeight + size),
    // randIntIJ(scr.offsetTop, scr.offsetHeight - scr.offsetTop - size),
    colors = ['red', 'blue', 'yellow', 'black', 'green', 'purple'],
    randColor = () => colors[randInt(colors.length)];

  const makeSpot = () => {
    const props = {
      left: left(),
      top: top(),
      size: size,
      color: randColor(),
    };
    // pr('props', props);
    const spot = Spot(props);
    return spot;
  };

  interval(100)
    .pipe(map(makeSpot), take(100))
    .subscribe((spot) => scr.append(spot));

  interval(150)
    .pipe(take(100))
    .subscribe(() => randRemoveSpot(scr));
};

const MM = { randIntIJ, Spot, run };
