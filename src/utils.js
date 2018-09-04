import { camera, character, pressingKeys } from './models';

export function transform(value, zoomRation = 1) {
  if (typeof value === 'object') {
    const theta = (camera.rotaion * Math.PI) / 180;
    return {
      x:
        window.innerWidth / 2 +
        (value.x - camera.x) * Math.cos(theta) * camera.zoom * zoomRation -
        (value.y - camera.y) * Math.sin(theta) * camera.zoom * zoomRation,
      y:
        window.innerHeight / 2 +
        (value.x - camera.x) * Math.sin(theta) * camera.zoom * zoomRation +
        (value.y - camera.y) * Math.cos(theta) * camera.zoom * zoomRation
    };
  } else {
    return value * camera.zoom * zoomRation;
  }
}

export function getAngle(point1, point2) {
  const diff_x = point1.x - point2.x;
  const diff_y = point1.y - point2.y;
  let angle = (360 * Math.atan(diff_y / diff_x)) / (2 * Math.PI) - 90;
  if (diff_x < 0) angle += 180;
  else if (diff_y < 0) angle += 360;
  else angle += 360;
  return angle;
}

export function getTheta(angle) {
  return (angle * Math.PI) / 180;
}

export function getDistanceToPlanetSurface(planet) {
  return Math.hypot(planet.x - camera.x, planet.y - camera.y) - planet.radius - character.height / 2;
}

export function getPositionOnPlanetSurface(planet, azimuth, point) {
  const anchorTheta = ((azimuth - 90) * Math.PI) / 180;
  const anchorPosition = {
    x: planet.x + planet.radius * Math.cos(anchorTheta),
    y: planet.y + planet.radius * Math.sin(anchorTheta)
  };
  if(!point) {
    return anchorPosition;
  }

  const { x, y } = point;
  const distance = Math.hypot(x, y);
  const angle = getAngle({ x: 0, y: 0 }, { x, y }) + azimuth - 90;
  const theta = (angle * Math.PI) / 180;
  return {
    x: anchorPosition.x + distance * Math.cos(theta),
    y: anchorPosition.y + distance * Math.sin(theta)
  };
}

export function isAccelerating() {
  return (
    (pressingKeys[38] || pressingKeys[40]) &&
    camera.fuel > 0 &&
    (!camera.planet || getDistanceToPlanetSurface(camera.planet) > 10)
  );
}

export function drawImage(context, layers) {
  return layers.map(layer => {
    context.beginPath();
    layer.paths.map(({x, y}, index) => {
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.fillStyle = layer.color(context);
    context.closePath();
    context.fill();
  });
}

