let {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  timestamp,
  merge,
  sampleTime,
  scan,
  combineLatest,
  startWith,
  fromEvent,
  flatMap,
  mergeMap,
  toArray,
  take,
  interval,
  from,
  of,
  range,
  filter,
  map,
  Observable,
  Subscribe,
} = rxjs;

// global const
const pr = console.log,
  prRet = (...xs) => {
    pr(...xs);
    return xs[xs.length - 1];
  };
(Element = (tag) => document.createElement(tag)),
  (SPEED = 40),
  (STAR_NUMBER = 250);

// random utilities ===============
const randInt = (i, j) => parseInt(i + Math.random() * (j - i), 10),
  randX = () => randInt(0, canvas.width),
  randY = () => randInt(0, canvas.height),
  randColor = () => '#' + randInt(0, parseInt('999999', 16)).toString(16);

// set up canvas =====
const canvas = Element('canvas'),
  ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// render =====
function renderScene({ stars, hero, enemy, hshots }) {
  paintStars(stars);
  paintSpaceShip(hero);
  paintEnemy(enemy);
  paintHeroShots(hshots);
}

// main =====
function main() {
  const Game = combineLatest([
    starStream,
    spaceShip,
    enemyStream,
    heroShots,
  ]).pipe(sampleTime(SPEED));

  const run = () => {
    Game.subscribe(([stars, hero, enemy, hshots]) =>
      renderScene({ stars, hero, enemy, hshots }),
    );
  };

  // run();
}

// export module =====
// const MM = {
//   main: () => {
//     pr('hi there');
//     main();
//   },
// };
