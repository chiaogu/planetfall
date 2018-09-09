import { character, camera, pressingKeys, stage } from './models';
import { transform, getDistanceToPlanetSurface, getAngle, isAccelerating, white } from './utils';
import { STAGE_OVER } from './constants';

const body = [
  [-9.6, -72.6],
  [-3.6, -75.4],
  [-3.6, -82.8],
  [-3, -84],
  [-2.2, -84.4],
  [-0.6, -84.8],
  [0.8, -84.6],
  [2, -83.2],
  [2.4, -82],
  [3.2, -75.2],
  [6.6, -73.6],
  [7.4, -40.6],
  [11, -21.4],
  [14.2, 2.6],
  [12.6, 3.2],
  [7.6, -16.8],
  [2, -33.4],
  [-1.4, -18],
  [-5, 2.8],
  [-7, 2.8],
  [-6, -12],
  [-5, -17],
  [-6.2, -37.4],
  [-10.6, -72.2]
];
const walkingBody = [
  [-9.6, -72.6],
  [-3.6, -75.4],
  [-3.6, -82.8],
  [-3, -84],
  [-2.2, -84.4],
  [-0.6, -84.8],
  [0.8, -84.6],
  [2, -83.2],
  [2.4, -82],
  [3.2, -75.2],
  [6.6, -73.6],
  [7.4, -40.6],
  [6, -21.4],
  [4.2, 2.6],
  [2.6, 3.2],
  [2.6, -16.8],
  [-6.2, -37.4],
  [-10.6, -72.2]
];
const leftArm = [[-14.8, -71], [-9.8, -72], [-4.8, -69.2], [-11.2, -49], [-5.2, -32.2], [-9.2, -30.8], [-16, -44.6]];
const rightArm = [[2.2, -72.8], [7.4, -73.4], [11, -70.4], [10.8, -47.6], [17.8, -35.6], [13.4, -32.8], [5.4, -48.2]];
const eye = [[-1.4, -81.2], [1.6, -81], [1.6, -82.2], [-1.6, -82.2]];
const leftLeg = [[-6.2, -37.8], [-4, -15], [-4, 3.2], [-2, 3.2], [0, -15], [3, -37.8]];

let frame = 0;
let isFaceRight = true;

export default context => {
  const planet = camera.planet;
  const width = transform(character.width);
  const height = transform(character.height);
  let x = window.innerWidth / 2 - width / 2;
  let y = window.innerHeight / 2 - height / 2;
  frame = (frame + 1) % 100;

  if (isAccelerating()) {
    context.shadowColor = '#fff';
    context.shadowBlur = 20;
    const delta = transform(0.8);
    x += Math.random() * delta - delta / 2;
    y += Math.random() * delta - delta / 2;

    const fireWidth = frame % 2 === 0 ? width * 0.75 : width;
    let fireHeight = frame % 2 === 0 ? height * 4 : height * 2;
    const gradient = context.createLinearGradient(
      x,
      pressingKeys[38] ? y : y,
      x,
      pressingKeys[38] ? y + fireHeight : y - fireHeight
    );
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, white(0));
    context.fillStyle = gradient;
    context.fillRect(
      x + width / 2 - fireWidth / 2,
      pressingKeys[38] ? y : y - fireHeight,
      fireWidth,
      !planet
        ? fireHeight
        : pressingKeys[38]
          ? Math.min(fireHeight, transform(getDistanceToPlanetSurface(planet)) + height)
          : fireHeight
    );
    context.shadowBlur = 0;
  }

  if ((pressingKeys[37] || pressingKeys[39]) && frame % 3 === 0) {
    const isNeedHorizontalFire = !planet || (planet && camera.isJumping && getDistanceToPlanetSurface(planet) > 20);
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
      gradient.addColorStop(1, white(0));
      context.fillStyle = gradient;
      const rectArg = [
        pressingKeys[39] ? x - fireWidth : x + width,
        planet && (rDiff <= 10 || rDiff >= 350) ? y - fireHeight * 2 : y - fireHeight * 4,
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
        gradient.addColorStop(1, white(0));
        context.fillStyle = gradient;
        const rectArg = [pressingKeys[37] ? x - fireWidth : x + width, y + height - fireHeight, fireWidth, fireHeight];
        context.fillRect(...rectArg);
        context.fillRect(...rectArg);
      }
    }
  }

  if (stage.code !== STAGE_OVER) {
    if (pressingKeys[37]) {
      isFaceRight = false;
    } else if (pressingKeys[39]) {
      isFaceRight = true;
    }
  }

  const isWalking = frame % 25 >= 13 && (pressingKeys[39] || pressingKeys[37]) && stage.code !== STAGE_OVER;
  const parts = [rightArm, ...(isWalking ? [leftLeg] : []), !isWalking ? body : walkingBody, leftArm, eye];
  parts.map((part, partIndex) => {
    if (partIndex === (!isWalking ? 3 : 4)) {
      context.shadowColor = '#000';
      context.fillStyle = '#555';
      context.shadowBlur = 20;
    } else {
      context.shadowColor = '#555';
      context.fillStyle = '#fff';
      context.shadowBlur = 10;
    }
    context.beginPath();
    part.map(([_x, _y], index) => {
      const tNode = [
        transform(0.9 + (_x - 0.9) * (isFaceRight ? 1 : -1)) * 0.18 + x + width / 2,
        transform(_y) * 0.18 + y + height
      ];
      if (index === 0) {
        context.moveTo(...tNode);
      } else {
        context.lineTo(...tNode);
      }
    });
    context.fill();
  });
};
