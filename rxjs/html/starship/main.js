let {
  BehaviorSubject,
  takeWhile,
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
function renderScene({ stars, hero, enemies, hshots, score }) {
  paintStars(stars);
  paintSpaceShip(hero);
  paintEnemy(enemies);
  paintHeroShots(hshots, enemies);
  paintScore(score);
}

// main =====
function main() {
  const Game = combineLatest([
    starStream,
    spaceShip,
    enemyStream,
    heroShots,
    score,
  ]).pipe(
    sampleTime(SPEED),
    takeWhile((o) => {
      let [stars, hero, enemies, hshots, score] = o;
      return !gameOver(hero, enemies);
    }),
    // map((o) => {
    //   let [stars, hero, enemies, hshots] = o;
    //   heroShotsToEnemy(hshots, enemies);
    //   return o;
    // }),
  );

  const run = () => {
    Game.subscribe(([stars, hero, enemies, hshots, score]) =>
      renderScene({ stars, hero, enemies, hshots, score }),
    );
  };
  run();
}

// export module =====
// const MM = {
//   main: () => {
//     pr('hi there');
//     main();
//   },
// };
