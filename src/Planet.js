export default class Planet {
  constructor() {
    this.radius = 200;
    this.x = 100;
    this.y = 100;
  }
  render(context, camera) {
    context.fillStyle = "#fff";
    const { x, y } = camera.transform(this);
    context.beginPath();
    context.arc(x, y, this.radius * camera.zoom, 0, 2 * Math.PI);
    context.fill();
  }
}
