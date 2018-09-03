import { character, camera, pressingKeys } from './models';
import { transform, distanceToPlanetSurface, getAngle, isAccelerating } from './utils';

let frame = 0;

export default context => {
  const planet = camera.planet;
  const width = transform(character.width);
  const height = transform(character.height);
  let x = window.innerWidth / 2 - width / 2;
  let y = window.innerHeight / 2 - height / 2;
  frame = (frame + 1) % 100;

  if (isAccelerating()) {
    const delta = transform(0.8);
    x += Math.random() * delta - delta / 2;
    y += Math.random() * delta - delta / 2;

    const fireWidth = frame % 2 === 0 ? width * 0.75 : width;
    let fireHeight = frame % 2 === 0 ? height * 3 : height * 1.5;
    const gradient = context.createLinearGradient(
      x,
      pressingKeys[38] ? y + height : y,
      x,
      pressingKeys[38] ? y + height + fireHeight : y - fireHeight
    );
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(
      x + width / 2 - fireWidth / 2,
      pressingKeys[38] ? y + height : y - fireHeight,
      fireWidth,
      !planet
        ? fireHeight
        : pressingKeys[38]
          ? Math.min(fireHeight, transform(distanceToPlanetSurface(planet)))
          : fireHeight
    );
  }

  if ((pressingKeys[37] || pressingKeys[39]) && frame % 3 === 0) {
    const isNeedHorizontalFire = !planet || (planet && camera.isJumping && distanceToPlanetSurface(planet) > 20);
    const gravityAngle = planet ? getAngle(planet, camera) : 0;
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
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      const rectArg = [
        pressingKeys[39] ? x - fireWidth : x + width,
        planet && (rDiff <= 10 || rDiff >= 350) ? y + height / 2 - fireHeight : y,
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
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        const rectArg = [pressingKeys[37] ? x - fireWidth : x + width, y + height - fireHeight, fireWidth, fireHeight];
        context.fillRect(...rectArg);
        context.fillRect(...rectArg);
      }
    }
  }

  context.lineWidth = 1;
  context.strokeStyle = '#fff';
  context.fillStyle = '#000';
  context.beginPath();
  context.fillRect(x, y, width, height);
  context.rect(x, y, width, height);
  context.stroke();
  context.closePath();
};
