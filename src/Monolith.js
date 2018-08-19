export default class Monolith {
  constructor() {
    this.width = 5;
    this.height = this.width * 1.618;
  }

  render(context, { zoom }) {
    context.lineWidth = 1;
    context.strokeStyle = "#fff";
    context.fillStyle = "#000";

    const width = this.width * zoom;
    const height = this.height * zoom;
    const x = window.innerWidth / 2 - width / 2;
    const y = window.innerHeight / 2 - height / 2;
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;

    context.beginPath();
    context.fillRect(x, y, width, height);
    context.rect(x, y, width, height);
    context.stroke();
    context.closePath();
  }
}
