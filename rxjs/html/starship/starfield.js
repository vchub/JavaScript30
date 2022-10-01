function paintStars(stars) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach((s) => ctx.fillRect(s.x, s.y, s.size, s.size));
}

const starStream = range(STAR_NUMBER).pipe(
  map(() => ({
    x: randX(),
    y: randY(),
    size: Math.random() * 3 + 1,
  })),
  toArray(),
  mergeMap((arr) =>
    interval(SPEED).pipe(
      map((i) => {
        arr.forEach((s) => {
          if (s.y >= canvas.height) s.y = 0;
          s.y += s.size;
        });
        return arr;
      }),
    ),
  ),
);
