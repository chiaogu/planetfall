import { camera, pressingKeys, character, stage } from './models';
import { getAngle, getTheta, getDistanceToPlanetSurface, getPositionOnPlanetSurface } from './utils';
import { STAGE_OVER, OVER_REASON_RUNNING_OUT_OF_FUEL } from './constants';
const A = 0.1;
const AR = 0.03;

export default () => {
  if (camera.planet && (stage.code !== STAGE_OVER || stage.reason === OVER_REASON_RUNNING_OUT_OF_FUEL)) {
    updateOnPlanet();
  } else {
    updateInSpace();
  }

  camera.x += camera.vx;
  camera.y += camera.vy;
};

function updateOnPlanet() {
  const planet = camera.planet;
  const gravityAngle = getAngle(planet, camera);
  const gravityTheta = getTheta(gravityAngle);
  const cameraTheta = getTheta(camera.rotaion);
  const distance = getDistanceToPlanetSurface(planet);
  const distanceRatio = 1 - distance / planet.radius;

  if (distance <= 0) {
    camera.isJumping = false;
    camera.x -= camera.vx;
    camera.y -= camera.vy;
    camera.vx = 0;
    camera.vy = 0;
    updateFuel(0.3);
  } else {
    camera.vx -= planet.gravity * distanceRatio * distanceRatio * Math.sin(gravityTheta);
    camera.vy += planet.gravity * distanceRatio * distanceRatio * Math.cos(gravityTheta);
  }

  camera.zoom = 1 + 4 * distanceRatio * distanceRatio * distanceRatio;
  let rDiff = 360 - gravityAngle - camera.rotaion;
  if (rDiff < 0) rDiff += 360;
  if (rDiff > 10 && rDiff < 180) {
    camera.rotaion += 10 * distanceRatio * distanceRatio;
    camera.rotaion %= 360;
  } else if (rDiff >= 180 && rDiff <= 350) {
    camera.rotaion -= 10 * distanceRatio * distanceRatio;
    camera.rotaion %= 360;
  } else {
    camera.vr = 0;
    camera.rotaion = 360 - gravityAngle;
  }

  if (rDiff < 10 || rDiff > 350) {
    const ha = 0.075 + ((2000 - planet.radius) / 2000) * 0.4;
    if (pressingKeys[37]) {
      if (distance <= 0) {
        const { x, y } = getPositionOnPlanetSurface(planet, gravityAngle - ha, { x: 0, y: -character.height / 2 });
        camera.x = x;
        camera.y = y;
      } else {
        camera.vx -= 0.05 * Math.cos(gravityTheta);
        camera.vy -= 0.05 * Math.sin(gravityTheta);
      }
    }
    if (pressingKeys[39]) {
      if (distance <= 0) {
        const { x, y } = getPositionOnPlanetSurface(planet, gravityAngle + ha, { x: 0, y: -character.height / 2 });
        camera.x = x;
        camera.y = y;
      } else {
        camera.vx += 0.05 * Math.cos(gravityTheta);
        camera.vy += 0.05 * Math.sin(gravityTheta);
      }
    }
  } else {
    if (pressingKeys[37]) {
      camera.vr += AR;
    }
    if (pressingKeys[39]) {
      camera.vr -= AR;
    }
    camera.rotaion += camera.vr;
  }

  if (pressingKeys[38]) {
    if (camera.isJumping) {
      if (distance > 10 && camera.fuel > 0) {
        camera.vx -= 0.05 * Math.sin(cameraTheta);
        camera.vy -= 0.05 * Math.cos(cameraTheta);
        updateFuel(-0.1);
      }
    } else {
      camera.isJumping = true;
      camera.vx += 1 * Math.sin(gravityTheta);
      camera.vy -= 1 * Math.cos(gravityTheta);
    }
  }

  if (pressingKeys[40]) {
    if (distance > 10) {
      if (camera.fuel > 0) {
        camera.vx += 0.05 * Math.sin(cameraTheta);
        camera.vy += 0.05 * Math.cos(cameraTheta);
        updateFuel(-0.1);
      }
    }
  }
}

function updateInSpace() {
  const cameraTheta = (camera.rotaion * Math.PI) / 180;
  if (pressingKeys[37]) {
    camera.vr += AR;
  }
  if (pressingKeys[39]) {
    camera.vr -= AR;
  }
  if (pressingKeys[38] && camera.fuel > 0) {
    camera.vx -= A * Math.sin(cameraTheta);
    camera.vy -= A * Math.cos(cameraTheta);
    updateFuel(-0.1);
  }
  if (pressingKeys[40] && camera.fuel > 0) {
    camera.vx += A * Math.sin(cameraTheta);
    camera.vy += A * Math.cos(cameraTheta);
    updateFuel(-0.1);
  }
  camera.rotaion += camera.vr;
  camera.rotaion %= 360;
  camera.rotaion += camera.rotaion < 0 ? 360 : 0;
}

function updateFuel(amount) {
  camera.fuel += amount;
  camera.fuel = Math.min(Math.max(camera.fuel, 0), 100);
}
