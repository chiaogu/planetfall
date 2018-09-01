import { findAngle } from './utils';
export default class Monolith {
  constructor() {
    this.width = 5;
    this.height = this.width * 1.618;
    this.tick = 0;
  }

  render(context, camera, planet, pressingKeys) {
    const width = this.width * camera.zoom;
    const height = this.height * camera.zoom;

    let x = window.innerWidth / 2 - width / 2;
    let y = window.innerHeight / 2 - height / 2;
    this.tick++;
    this.tick %= 100;

    if (pressingKeys[38] || pressingKeys[40]) {
      if (camera.fuel > 0) {
        if (!planet || camera.distance(planet, this) > 10) {
          const delta = 0.8 * camera.zoom;
          x += Math.random() * delta - delta / 2;
          y += Math.random() * delta - delta / 2;

          const fireWidth = this.tick % 2 === 0 ? width * 0.75 : width;
          let fireHeight = this.tick % 2 === 0 ? height * 3 : height * 1.5;
          const gradient = context.createLinearGradient(
            x,
            pressingKeys[38] ? y + height : y,
            x,
            pressingKeys[38] ? y + height + fireHeight : y - fireHeight
          );
          gradient.addColorStop(0, "#fff");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          context.fillStyle = gradient;
          context.fillRect(
            x + width / 2 - fireWidth / 2,
            pressingKeys[38] ? y + height : y - fireHeight,
            fireWidth,
            !planet
              ? fireHeight
              : pressingKeys[38]
                ? Math.min(
                    fireHeight,
                    camera.distance(planet, this) * camera.zoom
                  )
                : fireHeight
          );
        }
      } else {
      }
    }

    if ((pressingKeys[37] || pressingKeys[39]) && this.tick % 3 === 0) {
      const isNeedHorizontalFire =
        !planet ||
        (planet && camera.isJumping && camera.distance(planet, this) > 20);
      const gravityAngle = planet ? findAngle(planet, camera) : 0;
      let rDiff = 360 - gravityAngle - camera.rotaion;
      if (rDiff < 0) rDiff += 360;

      if (isNeedHorizontalFire) {
        const fireWidth = width * 2;
        const fireHeight = width * 0.25;
        const gradient = context.createLinearGradient(
          pressingKeys[39] ? x : x + width,
          y,
          pressingKeys[39] ? x - fireWidth : x + width + fireWidth,
          y
        );
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = gradient;
        const rectArg = [
          pressingKeys[39] ? x - fireWidth : x + width,
          planet && (rDiff <= 10 || rDiff >= 350)
            ? y + height / 2 - fireHeight
            : y,
          fireWidth,
          fireHeight
        ];
        context.fillRect(...rectArg);
        context.fillRect(...rectArg);

        if (!planet || (rDiff > 10 && rDiff < 350)) {
          const gradient = context.createLinearGradient(
            pressingKeys[37] ? x : x + width,
            y,
            pressingKeys[37] ? x - fireWidth : x + width + fireWidth,
            y
          );
          gradient.addColorStop(0, "#fff");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          context.fillStyle = gradient;
          const rectArg = [
            pressingKeys[37] ? x - fireWidth : x + width,
            y + height - fireHeight,
            fireWidth,
            fireHeight
          ];
          context.fillRect(...rectArg);
          context.fillRect(...rectArg);
        }
      }
    }

    context.lineWidth = 1;
    context.strokeStyle = "#fff";
    context.fillStyle = "#000";
    context.beginPath();
    context.fillRect(x, y, width, height);
    context.rect(x, y, width, height);
    context.stroke();
    context.closePath();
  }
}
