export default class Planet {
  constructor() {
    this.radius = 200;
    this.x = 100;
    this.y = 100;
    this.elasticity = 0.5;
  }
  render(context, camera) {
    context.fillStyle = "#fff";
    const { x, y } = camera.transform(this);
    this._x = x;
    this._y = y;
    this._radius = this.radius * camera.zoom;

    context.beginPath();
    context.arc(x, y, this._radius, 0, 2 * Math.PI);
    context.fill();
  }
}
