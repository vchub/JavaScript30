const ENEMY_SIZE = 20,
  ENEMY_FREQUENCY = 1500,
  ENEMY_SPEED_Y = 4,
  ENEMY_COLORS = ['red', 'blue', 'gree'],
  ENEMY_SHOTS_FEQ = 1500;

const randColorE = () => ENEMY_COLORS[randInt(0, ENEMY_COLORS.length)];

const enemyStream = interval(ENEMY_FREQUENCY).pipe(
  scan((acc, i) => {
    const x = randX(),
      y = -15,
      color = randColorE(),
      shots = [],
      enemy = { x, y, color, shots };

    // shooting
    interval(ENEMY_SHOTS_FEQ).subscribe(() => {
      enemy.shots.push({ x: enemy.x, y: enemy.y });
      enemy.shots.filter(isVisible);
    });

    acc.push(enemy);
    return acc
      .filter(isVisible)
      .filter((e) => !(e.isDead && e.shots.length < 1));
  }, []),
  // map((arr) => prRet(arr)),
  // map((arr) => arr.filter(isVisible)),
);

function paintEenemyShots(shots) {
  paintShots(shots, SHOT_SPEED, '#00ff00', 'down');
}

function paintEnemy(es) {
  es.forEach((e) => {
    e.y += ENEMY_SPEED_Y;
    e.x += randInt(-15, 15);
    if (!e.isDead) drawTriangle(e.x, e.y, ENEMY_SIZE, e.color, 'down');
    paintEenemyShots(e.shots);
  });
}

function isVisible({ x, y }) {
  // pr(x, y);
  return x > -40 && x < canvas.width + 40 && y > -40 && y < canvas.height + 40;
}

function collision(a, b) {
  const r = 20;
  return Math.abs(a.x - b.x) < r && Math.abs(a.y - b.y) < r;
}

// [{x,y}], {x,y} -> * mutated enemy
function heroShotsToEnemy(shots, enemies) {
  for (const enemy of enemies) {
    for (const shot of shots) {
      if (collision(shot, enemy)) {
        enemy.isDead = true;
        setTimeout(() => (enemy.y = -100), enemyTTL(enemy));
        break;
      }
    }
  }
}

function enemyTTL({ x, y }) {
  return (canvas.height - y) / ENEMY_SPEED_Y / 40;
}

function gameOver(hero, enemies) {
  return enemies.some(
    (e) => collision(hero, e) || e.shots.some((s) => collision(hero, s)),
  );
}
