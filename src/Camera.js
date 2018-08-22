const A = 0.01;
const AR = 0.03;

export default class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.vr = 0;
    this.rotaion = 0;
    this.zoom = 1;
    this.isJumping = false;
  }

  update(pressingKeys, planet, monolith) {
    if (planet) {
      this.updateOnPlanet(pressingKeys, planet, monolith);
    } else {
      this.updateInSpace(pressingKeys);
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  updateOnPlanet(pressingKeys, planet, monolith) {
    const gravityAngle = this.findAngle(planet);
    const gravityTheta = (gravityAngle * Math.PI) / 180;

    const distance = this.distance(planet, monolith);
    const isCollided = distance <= 0;
    if (isCollided) {
      this.isJumping = false;
      this.x -= this.vx;
      this.y -= this.vy;
      this.vx = 0;
      this.vy = 0;
      this.vr = 0;
    } else {
      this.vx -= 0.05 * Math.sin(gravityTheta);
      this.vy += 0.05 * Math.cos(gravityTheta);
    }

    if (pressingKeys[37]) {
      this.vx -= 0.05 * Math.cos(gravityTheta);
      this.vy -= 0.05 * Math.sin(gravityTheta);
    }
    if (pressingKeys[39]) {
      this.vx += 0.05 * Math.cos(gravityTheta);
      this.vy += 0.05 * Math.sin(gravityTheta);
    }
    if (pressingKeys[38] && !this.isJumping) {
      this.isJumping = true;
      this.vx += 1 * Math.sin(gravityTheta);
      this.vy -= 1 * Math.cos(gravityTheta);
    }
    if (pressingKeys[40]) {
      this.vx -= 0.1 * Math.sin(gravityTheta);
      this.vy += 0.1 * Math.cos(gravityTheta);
    }
    if (pressingKeys[32]) {
      this.zoom = 8;
    } else {
      this.zoom = 1;
    }

    this.rotaion = 360 - gravityAngle;
  }

  updateInSpace(pressingKeys) {
    const cameraTheta = (this.rotaion * Math.PI) / 180;
    if (pressingKeys[37]) {
      this.vr += AR;
    }
    if (pressingKeys[39]) {
      this.vr -= AR;
    }
    if (pressingKeys[38]) {
      this.vx -= A * Math.sin(cameraTheta);
      this.vy -= A * Math.cos(cameraTheta);
    }
    if (pressingKeys[40]) {
      this.vx += A * Math.sin(cameraTheta);
      this.vy += A * Math.cos(cameraTheta);
    }
    this.rotaion += this.vr;
    this.rotaion %= 360;
    this.rotaion += this.rotaion < 0 ? 360 : 0;
  }

  findAngle(planet) {
    const { x, y } = this;
    const diff_x = planet.x - x;
    const diff_y = planet.y - y;
    let angle = (360 * Math.atan(diff_y / diff_x)) / (2 * Math.PI) - 90;
    if (diff_x < 0) angle += 180;
    else if (diff_y < 0) angle += 360;
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
