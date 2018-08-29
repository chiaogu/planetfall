export default class Background {
  constructor() {
    this.stars = Array(500)
      .fill()
      .map(_ => ({
        x: Math.random() * 15000 - 7500,
        y: Math.random() * 15000 - 7500,
        radius: Math.random() * 0.1
      }));
  }
  render(context, camera) {
    this.stars.forEach(star => {
      context.fillStyle = "#fff";

      if (Math.hypot(star.x - camera.x, star.y - camera.y) > 7500) {
        star.x = Math.random() * 15000 - 7500 + camera.x;
        star.y =  Math.random() * 15000 - 7500 + camera.y;
      }
;
      let { x, y } = camera.transform(star, star.radius + 0.1);
      context.fillRect(x, y, 1 + 1 * star.radius /0.1, 1 + 1 * star.radius /0.1);
    });
  }
}
