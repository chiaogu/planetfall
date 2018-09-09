import { camera, planets, stage } from './models';
import { STAGE_TITLE, OBJECT_BUILDING } from './constants';
import { transform, getDistanceToPlanetSurface, getPositionOnPlanetSurface, getAngle } from './utils';
import getObjectRenderer from './getObjectRenderer';

export function drawPlanets(context) {
  let closesetDistance = Number.MAX_VALUE;
  let closesetPlanet = undefined;

  planets.map(planet => {
    const distance = getDistanceToPlanetSurface(planet);
    if (distance < planet.radius && distance < closesetDistance) {
      closesetPlanet = planet;
      closesetDistance = distance;
    }

    if (isPlanetVisible(planet)) {
      const { x, y } = transform(planet);
      const radius = transform(planet.radius);
      context.fillStyle = planet.color.land;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    }
  });

  if (closesetPlanet && closesetPlanet !== camera.planet) {
    camera.landingAzimuth = getAngle(closesetPlanet, camera);
  }
  camera.planet = closesetPlanet;
}

export function drawAtmosphere(context) {
  planets.map(planet => {
    const { x, y } = transform(planet);
    const radius = transform(planet.radius);

    context.lineWidth = 0.3;
    context.strokeStyle = '#fff';
    context.beginPath();
    context.arc(x, y, radius * 2, 0, 2 * Math.PI);
    context.stroke();

    const grd = context.createRadialGradient(x, y, radius, x, y, radius * 2);
    planet.color.atmosphere.map(color => grd.addColorStop(color[0], color[1]));
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = grd;
    context.fill();
  });
}

export function drawObjects(context) {
  planets.map(planet => {
    if (planet.objects && isPlanetVisible(planet)) {
      planet.objects.map(([azimuth, id, state]) =>
        getObjectRenderer(id)(
          context,
          (x, y) => transform(getPositionOnPlanetSurface(planet, azimuth, { x, y })),
          state
        )
      );
    }
  });
}

export function drawBackground(context) {
  planets.map(planet => {
    if (planet.bgs && isPlanetVisible(planet)) {
      let angleDiff = getAngle(planet, camera) - camera.landingAzimuth;
      if (angleDiff < 0) angleDiff += 360;
      if (angleDiff > 180) angleDiff = angleDiff - 360;
      angleDiff = angleDiff || 0;
      planet.bgs.map(([gap, offset, id, scale = 1, distance = 0, ...args]) =>
        Array(Math.round(360 / gap))
          .fill()
          .map((_, index) => {
            const azimuth = (index * gap + offset) % 360;
            const { x, y } = getPositionOnPlanetSurface(planet, azimuth + angleDiff * distance);
            const render = getObjectRenderer(id);
            if (
              render &&
              transform(Math.hypot(x - camera.x, y - camera.y)) < Math.hypot(window.innerWidth, window.innerHeight)
            ) {
              render(
                context,
                (x, y) => {
                  const position = getPositionOnPlanetSurface(planet, azimuth + angleDiff * distance, {
                    x: x * scale,
                    y: y * scale
                  });
                  return transform(position);
                },
                [azimuth, scale, args]
              );
            }
          })
      );
    }
  });
}

function isPlanetVisible(planet) {
  const distance = getDistanceToPlanetSurface(planet);
  return stage.code !== STAGE_TITLE && transform(distance) < Math.hypot(window.innerWidth, window.innerHeight);
}
