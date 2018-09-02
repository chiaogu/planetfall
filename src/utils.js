export const findAngle = (point1, point2) => {
  const diff_x = point1.x - point2.x;
  const diff_y = point1.y - point2.y;
  let angle = (360 * Math.atan(diff_y / diff_x)) / (2 * Math.PI) - 90;
  if (diff_x < 0) angle += 180;
  else if (diff_y < 0) angle += 360;
  else angle += 360;
  return angle;
};

export const drawImage = (context, layers) =>
  layers.map(layer => {
    context.beginPath();
    layer.paths.map(([x, y], index) => {
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.fillStyle = layer.color(context);
    context.closePath();
    context.fill();
  });
