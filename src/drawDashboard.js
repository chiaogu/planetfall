import { camera, objectives, planets } from './models';
import { getAngle, isAccelerating } from './utils';

export default context => {
  const attrs = [
    ['velocity', (Math.hypot(camera.vx, camera.vy) * 10).toFixed(), 200],
    ['fuel', Math.round(camera.fuel), 100],
    [
      'saved planet',
      Object.keys(objectives.savedPlanets).filter(planet => objectives.savedPlanets[planet]).length,
      planets.length
    ]
  ];

  if (camera.planet) {
    const azimuth = Math.round(getAngle(camera.planet, camera));
    attrs.push(['planet', camera.planet.name]);
    attrs.push(['azimuth', azimuth, 360]);
  }

  const delta = 3;
  const [x, y] = !isAccelerating() ? [0, 0] : [Math.random() * delta - delta / 2, Math.random() * delta - delta / 2];

  attrs.forEach(([name, value, denominator], index) => {
    const margin = 58;
    context.fillStyle = '#fff';

    context.font = '16px Courier New';
    context.fillText(name, 20 + x, 30 + y + margin * index);
    context.font = '20px Courier New';
    context.fillText(value, 20 + x, 52 + y + margin * index);

    if (denominator) {
      const ratio = Math.min(1, value / denominator);
      context.fillStyle = '#fff';
      context.fillRect(65 + x, 40 + y + margin * index, 100 * ratio, 10);
      context.fillStyle = 'rgba(255,255,255,0.3)';
      context.fillRect(65 + y, 40 + y + margin * index, 100, 10);
    }
  });
};
