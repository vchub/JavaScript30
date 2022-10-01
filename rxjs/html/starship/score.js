function paintScore(score) {
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(`Score: ${score}`, 40, 43);
}

const scoreSubject = new BehaviorSubject(0),
  score = scoreSubject.pipe(scan((prev, cur) => prev + cur, 0));
