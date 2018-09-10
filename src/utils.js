import { camera, character, pressingKeys, objectives } from './models';
import { OBJECT_SATELLITE_STATION } from './constants';

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
  if (!point) {
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

export function transformColorStops(color, transformFunc) {
  let _color;
  if (typeof color === 'string') {
    _color = color;
  } else {
    const [x1, y1, x2, y2, stops] = color;
    const { x: _x1, y: _y1 } = transformFunc(x1, y1);
    const { x: _x2, y: _y2 } = transformFunc(x2, y2);
    _color = [_x1, _y1, _x2, _y2, stops];
  }
  return _color;
}

export function isAccelerating() {
  return (
    (pressingKeys[38] || pressingKeys[40]) &&
    camera.fuel > 0 &&
    (!camera.planet || getDistanceToPlanetSurface(camera.planet) > 10)
  );
}

export function drawImageOnPlanet(context, transformOnPlanet, layers) {
  drawImage(
    context,
    layers.map(({ color, paths, shadow }) => ({
      shadow,
      color: transformColorStops(color, transformOnPlanet),
      paths: paths.map(([x, y]) => transformOnPlanet(x, y))
    }))
  );
}

export function drawImage(context, layers) {
  return layers.map(layer => {
    if (layer.shadow) {
      context.shadowColor = layer.shadow[0];
      context.shadowBlur = layer.shadow[1];
    }
    context.beginPath();
    layer.paths.map(({ x, y }, index) => {
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.fillStyle = typeof layer.color === 'string' ? layer.color : getLinearGradient(context, ...layer.color);
    context.closePath();
    context.fill();
    context.shadowBlur = 0;
  });
}

export function getLinearGradient(context, x1, y1, x2, y2, stops) {
  const gradient = context.createLinearGradient(x1, y1, x2, y2);
  stops.map(args => gradient.addColorStop(...args));
  return gradient;
}

export function white(alpha) {
  return `rgba(255,255,255,${alpha})`;
}

export function isNearStaelliteStation() {
  if (camera.planet) {
    const satelliteStation = camera.planet.objects.find(object => object[1] === OBJECT_SATELLITE_STATION);
    const satelliteStationPosition = getPositionOnPlanetSurface(camera.planet, satelliteStation[0]);
    const distance = Math.hypot(camera.x - satelliteStationPosition.x, camera.y - satelliteStationPosition.y);
    return distance < 20;
  } else {
    return false;
  }
}

export function mapTouchEventToKeyCode({ touches }) {
  if (!touches || touches.length === 0) return;
  const [{ clientX, clientY }] = touches;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = width / 3;
  if (clientX < size && clientY > height - size) {
    return 37;
  } else if (clientX > size && clientX < size * 2 && clientY > height - size) {
    return 40;
  } else if (clientX > size && clientX < size * 2 && clientY > height - size * 2 && clientY < height - size) {
    return 38;
  } else if (clientX > size * 2 && clientY > height - size) {
    return 39;
  }else {
    return 32;
  }
}
