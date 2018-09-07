import { camera, planets, stage } from './models';
import { STAGE_TITLE, OBJECT_BUILDING } from './constants';
import { transform, getDistanceToPlanetSurface, getPositionOnPlanetSurface, getAngle } from './utils';
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

    if (stage.code !== STAGE_TITLE && transform(distance) < Math.hypot(window.innerWidth, window.innerHeight)) {
      drawBackground(context, planet);
      drawObjects(context, planet);

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
    planet.color.atmosphere.map(color => grd.addColorStop(color[0], color[1]));
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = grd;
    context.fill();
  });
}

function drawObjects(context, planet) {
  if (planet.objects) {
    planet.objects.map(([azimuth, id, state]) =>
      getObjectRenderer(id)(context, (x, y) => transform(getPositionOnPlanetSurface(planet, azimuth, { x, y })), state)
    );
  }
}

function drawBackground(context, planet) {
  // const azimuth = getAngle(planet, camera);
  // console.log(planet)
  if (planet.bgs) {
    planet.bgs.map(([gap, id]) =>
      Array(360 / gap)
        .fill()
        .map((_, index) => {
          const azimuth = index * gap;
          return getObjectRenderer(id)(context, (x, y) =>
            transform(getPositionOnPlanetSurface(planet, azimuth, { x, y }))
          );
        })
    );
  }
}
