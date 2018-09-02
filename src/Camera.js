import { findAngle } from './utils';
const A = 0.1;
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
    this.fuel = 100;
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
    const gravityAngle = findAngle(planet, this);
    const gravityTheta = (gravityAngle * Math.PI) / 180;
    const cameraTheta = (this.rotaion * Math.PI) / 180;
    const distance = this.distance(planet, monolith);
    const distanceRatio = 1 - distance / planet.radius;

    const isCollided = distance <= 0;
    if (isCollided) {
      this.isJumping = false;
      this.x -= this.vx;
      this.y -= this.vy;
      this.vx = 0;
      this.vy = 0;
      this.updateFuel(0.3);
    } else {
      this.vx -= planet.gravity * distanceRatio * distanceRatio * Math.sin(gravityTheta);
      this.vy += planet.gravity * distanceRatio * distanceRatio * Math.cos(gravityTheta);
    }

    this.zoom = 1 + 5 * distanceRatio * distanceRatio * distanceRatio;
    let rDiff = 360 - gravityAngle - this.rotaion;
    if (rDiff < 0) rDiff += 360;
    if (rDiff > 10 && rDiff < 180) {
      this.rotaion += 10 * distanceRatio * distanceRatio;
      this.rotaion %= 360;
    } else if (rDiff >= 180 && rDiff <= 350) {
      this.rotaion -= 10 * distanceRatio * distanceRatio;
      this.rotaion %= 360;
    } else {
      this.vr = 0;
      this.rotaion = 360 - gravityAngle;
    }
    if (rDiff < 10 || rDiff > 350) {
      if (pressingKeys[37]) {
        this.vx -= 0.05 * Math.cos(gravityTheta);
        this.vy -= 0.05 * Math.sin(gravityTheta);
      }
      if (pressingKeys[39]) {
        this.vx += 0.05 * Math.cos(gravityTheta);
        this.vy += 0.05 * Math.sin(gravityTheta);
      }
    } else {
      if (pressingKeys[37]) {
        this.vr += AR;
      }
      if (pressingKeys[39]) {
        this.vr -= AR;
      }
      this.rotaion += this.vr;
    }
    if (pressingKeys[38]) {
      if (this.isJumping) {
        if (distance > 10 && this.fuel > 0) {
          this.vx -= 0.05 * Math.sin(cameraTheta);
          this.vy -= 0.05 * Math.cos(cameraTheta);
          this.updateFuel(-0.1);
        }
      } else {
        this.isJumping = true;
        this.vx += 1 * Math.sin(gravityTheta);
        this.vy -= 1 * Math.cos(gravityTheta);
      }
    }
    if (pressingKeys[40]) {
      if (distance > 10) {
        if (this.fuel > 0) {
          this.vx += 0.05 * Math.sin(cameraTheta);
          this.vy += 0.05 * Math.cos(cameraTheta);
          this.updateFuel(-0.1);
        }
      } else {
      }
    }
  }

  updateInSpace(pressingKeys) {
    const cameraTheta = (this.rotaion * Math.PI) / 180;
    if (pressingKeys[37]) {
      this.vr += AR;
    }
    if (pressingKeys[39]) {
      this.vr -= AR;
    }
    if (pressingKeys[38] && this.fuel > 0) {
      this.vx -= A * Math.sin(cameraTheta);
      this.vy -= A * Math.cos(cameraTheta);
      this.updateFuel(-0.1);
    }
    if (pressingKeys[40] && this.fuel > 0) {
      this.vx += A * Math.sin(cameraTheta);
      this.vy += A * Math.cos(cameraTheta);
      this.updateFuel(-0.1);
    }
    this.rotaion += this.vr;
    this.rotaion %= 360;
    this.rotaion += this.rotaion < 0 ? 360 : 0;
  }

  updateFuel(amount) {
    this.fuel += amount;
    this.fuel = Math.min(Math.max(this.fuel, 0), 100);
  }

  collision(planet, monolith) {
    return this.distance(planet, monolith) <= 0;
  }

  distance(planet, monolith) {
    return Math.hypot(planet.x - this.x, planet.y - this.y) - planet.radius - monolith.height / 2;
  }

  transform(point, zoomRation = 1) {
    const theta = (this.rotaion * Math.PI) / 180;
    let x =
      (point.x - this.x) * Math.cos(theta) * this.zoom * zoomRation -
      (point.y - this.y) * Math.sin(theta) * this.zoom * zoomRation +
      this.x;
    x = window.innerWidth / 2 - this.x + x;

    let y =
      (point.x - this.x) * Math.sin(theta) * this.zoom * zoomRation +
      (point.y - this.y) * Math.cos(theta) * this.zoom * zoomRation +
      this.y;
    y = window.innerHeight / 2 - this.y + y;

    return { x, y };
  }
}
