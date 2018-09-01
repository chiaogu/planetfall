import { findAngle } from "./utils";
import { SATELLITE_STATION } from './objects';
export default class Planet {
  constructor({ x, y, radius, gravity, satelliteStationAzimuth }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = gravity;
    if (satelliteStationAzimuth !== undefined) {
      this.satelliteStationAzimuth = (satelliteStationAzimuth - 90) % 360;
    }
  }
  render(context, camera) {
    const { x, y } = camera.transform(this);
    const radius = this.radius * camera.zoom;

    context.lineWidth = 0.3;
    context.strokeStyle = "#fff";
    context.beginPath();
    context.arc(x, y, radius * 2, 0, 2 * Math.PI);

    context.stroke();
    const grd = context.createRadialGradient(x, y, radius, x, y, radius * 1.8);
    grd.addColorStop(0, "#D16A20");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = grd;
    context.fill();

    this.renderBackground(context, camera);

    context.fillStyle = "#961F0E";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }

  renderBackground(context, camera) {
    // const anzimuth = camera.findAngle(this);
    if (this.satelliteStationAzimuth !== undefined) {
      const satelliteTheta = (this.satelliteStationAzimuth * Math.PI) / 180;
      const satelliteStation = {
        x: this.x + this.radius * Math.cos(satelliteTheta),
        y: this.y + this.radius * Math.sin(satelliteTheta)
      };

      [SATELLITE_STATION].map(object => {
        context.beginPath();
        object.paths.map(([_x, _y], index) => {
          const distance = Math.hypot(_x, _y);
          const angle =
            findAngle({ x: 0, y: 0 }, { x: _x, y: _y }) + this.satelliteStationAzimuth;
          const theta = (angle * Math.PI) / 180;
          const { x, y } = camera.transform({
            x: satelliteStation.x + distance * Math.cos(theta),
            y: satelliteStation.y + distance * Math.sin(theta)
          });
          if(index === 0) {
            context.moveTo(x, y);
          }else {
            context.lineTo(x, y);
          }
        })
        context.fillStyle = object.color;
        context.closePath();
        context.fill();
      });
    }
  }
}
