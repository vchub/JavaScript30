const SHOT_SPEED = 15,
  FIRE_FREQ = 200,
  SCORE_INC = 10;

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
    return acc.filter(isVisible);
  }, []),
);

function paintShots(shots, speed, color, direction) {
  shots.forEach((s) => {
    s.y += speed;
    drawTriangle(s.x, s.y, 5, color, direction);
  });
}

function paintHeroShots(shots, enemies) {
  shots.forEach((s) => {
    for (const e of enemies) {
      if (!e.isDead && collision(s, e)) {
        scoreSubject.next(SCORE_INC);
        e.isDead = true;
        s.y = -1000;
        break;
      }
    }

    s.y -= SHOT_SPEED;
    drawTriangle(s.x, s.y, 5, '#ffff00', 'up');
  });
}
