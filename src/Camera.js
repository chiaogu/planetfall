const A = 0.01;
const AR = 0.03;

export default class Camera {
  constructor() {
    this.x = 100;
    this.y = 10;
    this.vx = 0;
    this.vy = 0;
    this.vr = 0;
    this.rotaion = 0;
    this.zoom = 1;
  }

  update(pressingKeys) {
    const theta = (this.rotaion * Math.PI) / 180;

    if (pressingKeys[37]) {
      this.vr += AR;
    }
    if (pressingKeys[39]) {
      this.vr -= AR;
    }
    if (pressingKeys[38]) {
      this.vx -= A * Math.sin(theta);
      this.vy -= A * Math.cos(theta);
    }
    if (pressingKeys[40]) {
      this.vx += A * Math.sin(theta);
      this.vy += A * Math.cos(theta);
    }
    if (pressingKeys[32]) {
      this.zoom = 10;
    } else {
      this.zoom = 1;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.rotaion += this.vr;
    this.rotaion %= 360;
  }

  transform(point) {
    const theta = (this.rotaion * Math.PI) / 180;
    let x =
      (point.x - this.x) * Math.cos(theta) * this.zoom -
      (point.y - this.y) * Math.sin(theta) * this.zoom +
      this.x;
    x = window.innerWidth / 2 - this.x + x;

    let y =
      (point.x - this.x) * Math.sin(theta) * this.zoom +
      (point.y - this.y) * Math.cos(theta) * this.zoom +
      this.y;
    y = window.innerHeight / 2 - this.y + y;

    return { x, y };
  }
}
