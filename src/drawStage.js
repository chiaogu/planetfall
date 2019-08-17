import {
  STAGE_TITLE,
  STAGE_GAME,
  STAGE_ENDING,
  STAGE_OVER,
  FONT,
  OBJECT_SATELLITE_STATION,
  OVER_REASON_CRASH,
  OVER_REASON_RUNNING_OUT_OF_FUEL
} from './constants';
import { camera, pressingKeys, stage, objectives, planets } from './models';
import {
  isAccelerating,
  getPositionOnPlanetSurface,
  getDistanceToPlanetSurface,
  isNearStaelliteStation
} from './utils';

const description = 'Find the satellite station on each planet and take it offline';

let hasMoved = false;
let hasJump = false;
let hasLiftoff = false;
let hasEmitRadar = false;
let hasTurnOffStation = false;

let isGameOver = false;
let gameOverScreenOpacity = 0;

export default context => {
  if (stage.code === STAGE_TITLE) {
    drawTitle(context);
  } else if (stage.code === STAGE_ENDING) {
    drawEnding(context);
  } else if (stage.code === STAGE_GAME) {
    drawTutorial(context);
  } else if (stage.code === STAGE_OVER) {
    drawGameOver(context);
  }

  if (stage.code === STAGE_TITLE && pressingKeys[32]) {
    stage.startTime = Date.now();
    window.audioContext.resume();
    stage.code = STAGE_GAME;
  } else if (
    stage.code === STAGE_GAME &&
    Object.keys(objectives.savedPlanets).filter(planet => objectives.savedPlanets[planet]).length === planets.length
  ) {
    stage.code = STAGE_ENDING;
    stage.endTime = Date.now();
  } else if (stage.code === STAGE_ENDING || stage.code === STAGE_OVER) {
    if (pressingKeys[82]) {
      location.reload();
    }
  }

  if (camera.planet && getDistanceToPlanetSurface(camera.planet) <= 0 && Math.hypot(camera.vx, camera.vy) > 10) {
    stage.code = STAGE_OVER;
    stage.reason = OVER_REASON_CRASH;
  } else if (!camera.planet && camera.fuel === 0) {
    stage.code = STAGE_OVER;
    stage.reason = OVER_REASON_RUNNING_OUT_OF_FUEL;
  }

  if (stage.code === STAGE_OVER && stage.reason === OVER_REASON_RUNNING_OUT_OF_FUEL && camera.fuel > 0) {
    stage.code = STAGE_GAME;
  }
};

function drawGameOver(context) {
  if (stage.reason === OVER_REASON_CRASH) {
    camera.vx = 0;
    camera.vy = 0;
    camera.vr = 0;

    if (!isGameOver) {
      isGameOver = true;
      gameOverScreenOpacity = 1;
    }
    gameOverScreenOpacity -= 0.005;

    if (gameOverScreenOpacity >= 0) {
      context.fillStyle = `rgba(255,255,255,${gameOverScreenOpacity})`;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  context.shadowColor = '#fff';
  context.shadowBlur = 20;
  context.textAlign = 'center';
  context.fillStyle = '#fff';

  context.font = `24px ${FONT}`;
  let text;
  if (stage.reason === OVER_REASON_CRASH) {
    text = 'You must land carefully';
  } else if (stage.reason === OVER_REASON_RUNNING_OUT_OF_FUEL) {
    text = 'Running out of fuel';
  }
  context.fillText(text, window.innerWidth / 2, window.innerHeight / 6);

  context.font = `24px ${FONT}`;
  context.fillText(`[R] Restart`, window.innerWidth / 2, window.innerHeight / 6 + 112);

  context.shadowBlur = 0;
  context.textAlign = 'left';
}

function drawTutorial(context) {
  if (!hasMoved && (pressingKeys[37] || pressingKeys[39])) {
    hasMoved = true;
  } else if (hasMoved && !hasJump && pressingKeys[38]) {
    hasJump = true;
  } else if (hasJump && !hasLiftoff && isAccelerating()) {
    hasLiftoff = true;
  } else if (hasLiftoff && !hasEmitRadar && pressingKeys[32]) {
    hasEmitRadar = true;
  } else if (!hasTurnOffStation && isNearStaelliteStation() && pressingKeys[32]) {
    hasTurnOffStation = true;
  }

  let text;
  if (!hasMoved) {
    text = '[←][→] Move';
  } else if (!hasJump) {
    text = '[↑] Jump';
  } else if (!hasLiftoff) {
    text = '[Hold ↑] Liftoff';
  } else if (!hasEmitRadar) {
    text = '[Space] Emit Radar Wave';
  } else if (!hasTurnOffStation && isNearStaelliteStation()) {
    text = '[Space] Take Satellite Station Offline';
  } else {
    return;
  }

  context.shadowColor = '#fff';
  context.shadowBlur = 20;
  context.textAlign = 'center';
  context.fillStyle = '#fff';
  context.font = `24px ${FONT}`;
  context.fillText(text, window.innerWidth / 2, window.innerHeight * 0.84);
  context.shadowBlur = 0;
  context.textAlign = 'left';
}

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
  context.fillText('P L A N E T F A L L', window.innerWidth / 2, window.innerHeight * 0.167);

  context.font = `24px ${FONT}`;
  context.fillText('[Space] Start', window.innerWidth / 2, window.innerHeight * 0.84);

  context.font = `16px ${FONT}`;
  context.fillText(description, window.innerWidth / 2, window.innerHeight * 0.74);

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
  const timeText = [time / 3600000, time % 3600000 / 60000, time % 3600000 % 60000 / 1000].map(t => t.toFixed().padStart(2, '0')).join(':');
  context.fillText(
    timeText,
    window.innerWidth / 2,
    window.innerHeight / 6 + 64
  );

  context.font = `24px ${FONT}`;
  context.fillText(`[R] Restart`, window.innerWidth / 2, window.innerHeight / 6 + 112);

  context.shadowBlur = 0;
  context.textAlign = 'left';
}
