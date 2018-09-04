import { camera, planets } from './models';
import { transform, getDistanceToPlanetSurface, getPositionOnPlanetSurface } from './utils';
import getObjectRenderer from './getObjectRenderer';

export default context => {
  camera.planet = undefined;
  let closesetDistance = Number.MAX_VALUE;

  planets.map(planet => {
    const distance = getDistanceToPlanetSurface(planet);
    if (distance < planet.radius && distance < closesetDistance) {
      camera.planet = planet;
      closesetDistance = distance;
    }

    const { x, y } = transform(planet);
    const radius = transform(planet.radius);

    context.lineWidth = 0.3;
    context.strokeStyle = '#fff';
    context.beginPath();
    context.arc(x, y, radius * 2, 0, 2 * Math.PI);
    context.stroke();

    const grd = context.createRadialGradient(x, y, radius, x, y, radius * 1.8);
    grd.addColorStop(0, '#D16A20');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = grd;
    context.fill();

    drawBackground(context, planet);

    context.fillStyle = '#961F0E';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  });
};

function drawBackground(context, planet) {
  planet.objects.map(([azimuth, id]) =>
    getObjectRenderer(id)(context, (x, y) => {
      return transform(getPositionOnPlanetSurface(planet, azimuth, { x, y }));
    })
  );
}
