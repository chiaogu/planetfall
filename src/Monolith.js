export default class Monolith {
  render(context, { zoom }) {
    context.lineWidth = 1;
    context.strokeStyle = "#fff";
    context.fillStyle = "#000";

    const width = 5 * zoom;
    const height = width * 1.618;
    const x = window.innerWidth / 2 - width / 2;
    const y = window.innerHeight / 2 - height / 2;
    context.beginPath();
    context.fillRect(x, y, width, height);
    context.rect(x, y, width, height);
    context.stroke();
    context.closePath();
  }
}
