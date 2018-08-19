export default class Background {
  constructor() {
    this.stars = Array(5)
      .fill()
      .map(_ => ({
        x: 0,
        y: 0,
        radius: 2
      }));
  }
  render(context, camera) {
    this.stars.forEach(star => {
      context.fillStyle = "#fff";

      const x = camera.width / 2 - camera.x + star.x;
      const y = camera.height / 2 - camera.y + star.y;
      context.beginPath();
      context.arc(x, y, star.radius, 0, 2 * Math.PI);
      context.fill();
    });
  }
}
