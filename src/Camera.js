const A = 0.01;
const AR = 0.03;

export default class Camera {
  constructor() {
    this.x = 100;
    this.y = -110;
    this.vx = 0;
    this.vy = 0;
    this.vr = 0;
    this.rotaion = 0;
    this.zoom = 1;
  }

  update(pressingKeys, planet, monolith) {
    const cameraTheta = (this.rotaion * Math.PI) / 180;

    if (planet) {

      const isCollided = this.collision(planet, monolith);
      if (isCollided) {
        this.x -= this.vx;
        this.y -= this.vy;
        this.vx *= -planet.elasticity;
        this.vy *= -planet.elasticity;
        this.vr = 0;
      } else {
        const gravityTheta = (this.findAngle(planet) * Math.PI) / 180;
        this.vx += A * Math.sin(gravityTheta);
        this.vy += A * Math.cos(gravityTheta);
      }

      if (pressingKeys[38]) {
        this.vx = -0.5 * Math.sin(cameraTheta);
        this.vy = -0.5 * Math.cos(cameraTheta);
      }
    } else {

      if (pressingKeys[38]) {
        this.vx -= A * Math.sin(cameraTheta);
        this.vy -= A * Math.cos(cameraTheta);
      }
    }

    if (pressingKeys[37]) {
      this.vr += AR;
    }
    if (pressingKeys[39]) {
      this.vr -= AR;
    }
    if (pressingKeys[40]) {
      this.vx += A * Math.sin(cameraTheta);
      this.vy += A * Math.cos(cameraTheta);
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
    this.rotaion += this.rotaion < 0 ? 360 : 0;
  }

  findAngle(planet) {
    const { x, y } = this;
    const diff_x = planet.x - x;
    const diff_y = planet.y - y;
    let angle = (360 * Math.atan(diff_y / diff_x)) / (2 * Math.PI) - 90;
    if(diff_x < 0) angle += 180;
    else if(diff_y < 0) angle += 360;
    else angle += 360;
    return angle;
  }

  collision(planet, monolith) {
    return this.distance(planet, monolith) <= 0;
  }

  distance(planet, monolith) {
    const { _x: cx, _y: cy, _radius: radius } = planet;
    const { _x: rx, _y: ry, _width: rw, _height: rh } = monolith;
    let testX = cx;
    let testY = cy;

    if (cx < rx) testX = rx;
    else if (cx > rx + rw) testX = rx + rw;
    if (cy < ry) testY = ry;
    else if (cy > ry + rh) testY = ry + rh;

    const distX = cx - testX;
    const distY = cy - testY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return distance - radius;
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
