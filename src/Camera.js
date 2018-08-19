const A = 0.1;

export default class Camera {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.x = 100;
    this.y = 100;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
  }

  update(pressingKey) {
    if (pressingKey === 37) {
      this.ax = -A;
    } else if (pressingKey === 38) {
      this.ay = -A;
    } else if (pressingKey === 39) {
      this.ax = A;
    } else if (pressingKey === 40) {
      this.ay = A;
    } else if (pressingKey === 32) {
      this.vy -= (A * (this.vy < 0 ? -1 : 1));
      if(Math.abs(this.vy) <= A) this.vy = 0;
      this.vx -= (A * (this.vx < 0 ? -1 : 1));
      if(Math.abs(this.vx) <= A) this.vx = 0;
    } else {
      this.ax = 0;
      this.ay = 0;
    }

    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
  }
}
