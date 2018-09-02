import { findAngle } from './utils';
import { SatelliteStation } from './SatelliteStation';
export default class Planet {
  constructor({ x, y, radius, gravity, satelliteStationAzimuth }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = gravity;
    this.objects = [];
    if (satelliteStationAzimuth !== undefined) {
      this.satelliteStationAzimuth = (satelliteStationAzimuth - 90) % 360;
      this.objects.push({
        azimuth: this.satelliteStationAzimuth,
        render: new SatelliteStation().render
      });
    }
  }
  render(context, camera) {
    const { x, y } = camera.transform(this);
    const radius = this.radius * camera.zoom;

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

    this.renderBackground(context, camera);

    context.fillStyle = '#961F0E';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }

  renderBackground(context, camera) {
    const transform = azimuth => (_x, _y) => {
      const anchorTheta = (azimuth * Math.PI) / 180;
      const anchorPosition = {
        x: this.x + this.radius * Math.cos(anchorTheta),
        y: this.y + this.radius * Math.sin(anchorTheta)
      };
      const distance = Math.hypot(_x, _y);
      const angle = findAngle({ x: 0, y: 0 }, { x: _x, y: _y }) + azimuth;
      const theta = (angle * Math.PI) / 180;
      const { x, y } = camera.transform({
        x: anchorPosition.x + distance * Math.cos(theta),
        y: anchorPosition.y + distance * Math.sin(theta)
      });
      return [x, y];
    };

    this.objects.map(({ azimuth, render }) => {
      render(context, transform(azimuth));
    });
  }
}
