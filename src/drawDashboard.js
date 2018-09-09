import { camera, objectives, planets, stage } from './models';
import { getAngle, isAccelerating, getTheta, getDistanceToPlanetSurface, white } from './utils';
import { FONT, STAGE_TITLE } from './constants';

export default context => {
  if(stage.code === STAGE_TITLE) {
    return;
  }
  const attrs = [
    ['velocity', (Math.hypot(camera.vx, camera.vy) * 10).toFixed(), 200],
    ['fuel', Math.round(camera.fuel), 100]
  ];

  const delta = 3;
  let shake = !isAccelerating() ? [0, 0] : [Math.random() * delta - delta / 2, Math.random() * delta - delta / 2];
  let x = shake[0] + 32;
  let y = shake[1] + window.innerHeight - 140;

  context.shadowColor = '#fff';
  context.shadowBlur = 20;
  attrs.map(([name, value, denominator], index) => {
    const margin = 48;

    context.font = `16px ${FONT}`;
    context.fillStyle = white(0.3);
    context.fillText(name, x, 30 + y);
    context.font = `20px ${FONT}`;
    context.fillStyle = '#fff';
    context.fillText(value, x, 52 + y);

    if (denominator) {
      const ratio = Math.min(1, value / denominator);
      context.fillStyle = '#fff';
      context.fillRect(50 + x, 40 + y, 100 * ratio, 10);
      context.fillStyle = white(0.3);
      context.fillRect(50 + x, 40 + y, 100, 10);
    }

    y += margin;
  });

  context.textAlign = 'right';
  context.font = `24px ${FONT}`;
  context.fillStyle = white(0.3);
  context.fillText(`/${planets.length}`, shake[0] + window.innerWidth - 24, shake[1] + 50);
  context.font = `48px ${FONT}`;
  context.fillStyle = '#fff';
  context.fillText(
    Object.keys(objectives.savedPlanets).filter(planet => objectives.savedPlanets[planet]).length,
    shake[0] + window.innerWidth - 52,
    shake[1] + 50
  );

  if (camera.planet) {
    const x = shake[0] + window.innerWidth - 32;
    const y = shake[1] + window.innerHeight - 90;
    const r = 32;
    const theta = getTheta(getAngle(camera.planet, camera) - 90);

    context.fillStyle = white(0.3);
    context.beginPath();
    context.arc(x - r, y, r, 0, 2 * Math.PI);
    context.fill();

    const pointR = 32 + getDistanceToPlanetSurface(camera.planet) / camera.planet.radius * 32;
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(x - r + pointR * Math.cos(theta), y + pointR * Math.sin(theta), 3, 0, 2 * Math.PI);
    context.fill();

    context.font = `20px ${FONT}`;
    context.fillStyle = '#fff';
    context.textAlign = 'right';
    context.fillText(camera.planet.name, x, shake[1] + window.innerHeight - 32);
  }
  context.shadowBlur = 0;
};
