const HERO_SIZE = 20;

const HERO_Y = canvas.height - 30,
  mouseMove = fromEvent(canvas, 'mousemove'),
  spaceShip = mouseMove.pipe(
    map((event) => ({ x: event.clientX, y: HERO_Y })),
    startWith({
      x: canvas.width / 2,
      y: HERO_Y,
    }),
  );

function drawTriangle(x, y, width, color, direction) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - width, y);
  ctx.lineTo(x, direction === 'up' ? y - width : y + width);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x - width, y);
  ctx.fill();
}

function paintSpaceShip({ x, y }) {
  drawTriangle(x, y, HERO_SIZE, '#ff0000', 'up');
}
