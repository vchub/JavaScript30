const SHOT_SPEED = 15,
  FIRE_FREQ = 200;

const playerFiring = merge(
  // fromEvent(canvas, 'click'),
  fromEvent(document, 'keydown').pipe(
    filter((e) => e.keyCode == 32 || e.key == ' '),
  ),
).pipe(startWith({}), sampleTime(FIRE_FREQ), timestamp());

const heroShots = combineLatest([playerFiring, spaceShip]).pipe(
  map(([fire, ship]) => ({
    x: ship.x,
    timestamp: fire.timestamp,
  })),

  distinctUntilChanged(undefined, (shot) => shot.timestamp),
  // distinctUntilKeyChanged('timestamp'),

  scan((acc, shot) => {
    acc.push({
      x: shot.x,
      y: HERO_Y,
    });
    return acc;
  }, []),
);

function paintShots(shots, speed, color, direction) {
  shots.forEach((s) => {
    s.y += speed;
    drawTriangle(s.x, s.y, 5, color, direction);
  });
}

const paintHeroShots = (shots) =>
  paintShots(shots, -SHOT_SPEED, '#ffff00', 'up');

// function paintHeroShots(shots) {
//   shots.forEach((s) => {
//     s.y -= SHOT_SPEED;
//     drawTriangle(s.x, s.y, 5, '#ffff00', 'up');
//   });
// }
