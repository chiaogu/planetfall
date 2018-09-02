import { findAngle } from './utils';
export default class Dashboard {
  constructor() {}

  render({ context, camera, planets, closetPlanet }) {
    const v = (Math.hypot(camera.vx, camera.vy) * 10).toFixed();
    const fuel = Math.round(camera.fuel);
    const attrs = [['velocity', v, 200], ['fuel', fuel, 100]];

    if (closetPlanet) {
      const azimuth = Math.round(findAngle(closetPlanet, camera));
      attrs.push(['azimuth', azimuth, 360]);
    }

    attrs.forEach(([name, value, denominator], index) => {
      const margin = 55;
      context.fillStyle = '#fff';
      context.strokeStyle = '#000';

      context.font = '20px Courier New';
      context.fillText(name, 20, 30 + margin * index);
      context.fillText(value, 20, 51 + margin * index);

      const ratio = Math.min(1, value / denominator);
      context.fillStyle = '#fff';
      context.fillRect(65, 40 + margin * index, 100 * ratio, 10);
      context.fillStyle = 'rgba(255,255,255,0.3)';
      context.fillRect(65, 40 + margin * index, 100, 10);
    });
  }
}
