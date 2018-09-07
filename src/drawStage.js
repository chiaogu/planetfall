import { STAGE_TITLE, STAGE_GAME, STAGE_ENDING, FONT } from './constants';
import { camera, pressingKeys, stage, objectives, planets } from './models';

const description = [
  'The terrorists broke into the planetary defense system',
  'in an attempt to destroy the 13 planets in the system.',
  'The only way to stop it is to take the satellite station',
  'on the planet offline.'
];

let _stage = STAGE_TITLE;

export default context => {
  if (stage.code === STAGE_TITLE) {
    drawTitle(context);
  } else if (stage.code === STAGE_ENDING) {
    drawEnding(context);
  }

  if (stage.code === STAGE_TITLE && pressingKeys[13]) {
    stage.startTime = Date.now();
    stage.code = STAGE_GAME;
  } else if (
    stage.code === STAGE_GAME &&
    Object.keys(objectives.savedPlanets).filter(planet => objectives.savedPlanets[planet]).length === planets.length
  ) {
    stage.code = STAGE_ENDING;
    stage.endTime = Date.now();
  } else if (stage.code === STAGE_ENDING) {
    if (pressingKeys[82]) {
      location.reload();
    }
  }

  _stage = stage.code;
};

function drawTitle(context) {
  camera.vx = 0;
  camera.vy = 0;
  camera.vr = 0;
  camera.zoom = 15;

  context.fillStyle = '#000';
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  context.shadowColor = '#fff';
  context.shadowBlur = 20;
  context.textAlign = 'center';
  context.fillStyle = '#fff';

  context.font = `72px ${FONT}`;
  context.fillText('G R A V I T Y', window.innerWidth / 2, window.innerHeight / 6);

  context.font = `24px ${FONT}`;
  context.fillText('[Enter] Start', window.innerWidth / 2, window.innerHeight * 0.84);

  context.font = `16px ${FONT}`;
  context.textAlign = 'left';
  description.map((text, index) =>
    context.fillText(text, window.innerWidth / 2 - 270, window.innerHeight * 0.66 + 20 * index)
  );

  context.shadowBlur = 0;
}

function drawEnding(context) {
  context.shadowColor = '#fff';
  context.shadowBlur = 20;
  context.textAlign = 'center';
  context.fillStyle = '#fff';

  context.font = `24px ${FONT}`;
  const time = stage.endTime - stage.startTime;
  context.fillText(`You saved the entire system in`, window.innerWidth / 2, window.innerHeight / 6);

  context.font = `48px ${FONT}`;
  const timeText = [time / 3600000, time / 60000, time / 1000].map(t => t.toFixed().padStart(2, '0')).join(':');
  context.fillText(
    `${timeText}.${`${time % 1000}`.padStart(3, '0')}`,
    window.innerWidth / 2,
    window.innerHeight / 6 + 64
  );

  context.font = `24px ${FONT}`;
  context.fillText(`[R] Restart`, window.innerWidth / 2, window.innerHeight / 6 + 112);

  context.shadowBlur = 0;
  context.textAlign = 'left';
}
