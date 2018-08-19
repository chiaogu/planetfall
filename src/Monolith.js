export default class Monolith  {
  render(context, camera) {
    context.lineWidth = 1;
    context.strokeStyle = "#fff";
    context.fillStyle = "#000";

    const width = 30;
    const height = width * 1.618;
    const x = camera.width / 2 - width / 2;
    const y = camera.height / 2 - height / 2;
    context.beginPath();
    context.fillRect(x, y, width, height);
    context.rect(x, y, width, height);
    context.stroke();
    context.closePath();
  }
}
