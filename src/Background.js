export default class Background {
  constructor() {
    this.stars = Array(500)
      .fill()
      .map(_ => ({
        x: Math.random() * 4000 - 2000,
        y: Math.random() * 4000 - 2000,
        radius: Math.random() * 0.3
      }));
  }
  render(context, camera) {
    this.stars.forEach(star => {
      context.fillStyle = "#fff";

      if (Math.hypot(star.x - camera.x, star.y - camera.y) > 2000) {
        star.x = Math.random() * 4000 - 2000 + camera.x;
        star.y =  Math.random() * 4000 - 2000 + camera.y;
      }
;
      let { x, y } = camera.transform(star, star.radius + 0.3);
      context.fillRect(x, y, 1, 1);
    });
  }
}
