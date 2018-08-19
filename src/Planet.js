export default class Planet {
  constructor() {
    this.radius = 100;
    this.x = 100;
    this.y = 100;
  }
  render(context, camera) {
    context.strokeStyle = '#000';

    const x = camera.width / 2 - camera.x + this.x;
    const y = camera.height / 2 - camera.y + this.y;
    context.beginPath();
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }
}
