import { camera, planets, stage } from './models';
import { STAGE_GAME } from './constants';
import { transform, getDistanceToPlanetSurface, getPositionOnPlanetSurface } from './utils';
import getObjectRenderer from './getObjectRenderer';

export function drawPlanets(context) {
  camera.planet = undefined;
  let closesetDistance = Number.MAX_VALUE;

  planets.map(planet => {
    const distance = getDistanceToPlanetSurface(planet);
    if (distance < planet.radius && distance < closesetDistance) {
      camera.planet = planet;
      closesetDistance = distance;
    }

    if (stage.code === STAGE_GAME) {
      drawBackground(context, planet);

      const { x, y } = transform(planet);
      const radius = transform(planet.radius);
      context.fillStyle = planet.color.land;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    }
  });
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
    grd.addColorStop(0, planet.color.atmosphere);
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = grd;
    context.fill();
  });
}

function drawBackground(context, planet) {
  planet.objects.map(([azimuth, id, state]) =>
    getObjectRenderer(id)(context, state, (x, y) => {
      return transform(getPositionOnPlanetSurface(planet, azimuth, { x, y }));
    })
  );
}
