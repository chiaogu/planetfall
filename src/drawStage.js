import { STAGE_TITLE, STAGE_GAME, STAGE_ENDING, FONT, OBJECT_SATELLITE_STATION } from './constants';
import { camera, pressingKeys, stage, objectives, planets } from './models';
import { isAccelerating, getPositionOnPlanetSurface } from './utils';

const description = 'Find the satellite station on each planet and take it offline';

let hasMoved = false;
let hasJump = false;
let hasLiftoff = false;
let hasEmitRadar = false;
let hasTurnOffStation = false;

export default context => {
  if (stage.code === STAGE_TITLE) {
    drawTitle(context);
  } else if (stage.code === STAGE_ENDING) {
    drawEnding(context);
  } else if (stage.code === STAGE_GAME) {
    drawTutorial(context);
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
};

function drawTutorial(context) {
  if(!hasMoved && (pressingKeys[37] || pressingKeys[39])) {
    hasMoved = true;
  } else if(!hasJump && pressingKeys[38]) {
    hasJump = true;
  } else if(!hasLiftoff &&isAccelerating()) {
    hasLiftoff = true;
  } else if(!hasEmitRadar && pressingKeys[32]) {
    hasEmitRadar = true;
  } else if(!hasTurnOffStation && isNearStaelliteStation() && pressingKeys[32]) {
    hasTurnOffStation = true;
  }

  let text;
  if (!hasMoved) {
    text = '[←][→] Move'
  } else if (!hasJump) {
    text = '[↑] Jump'
  } else if (!hasLiftoff) {
    text = '[Hold ↑] Liftoff'
  } else if (!hasEmitRadar) {
    text = '[Space] Emit Radar Wave'
  } else if (!hasTurnOffStation && isNearStaelliteStation()) {
    text = '[Space] Take Satellite Station Offline'
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
  context.fillText('G R A V I T Y', window.innerWidth / 2, window.innerHeight * 0.167);

  context.font = `24px ${FONT}`;
  context.fillText('[Enter] Start', window.innerWidth / 2, window.innerHeight * 0.84);

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

function isNearStaelliteStation() {
  if(camera.planet) {
    const satelliteStation = camera.planet.objects.find(object => object[1] === OBJECT_SATELLITE_STATION);
    const satelliteStationPosition = getPositionOnPlanetSurface(camera.planet, satelliteStation[0]);
    const distance = Math.hypot(camera.x - satelliteStationPosition.x, camera.y - satelliteStationPosition.y);
    return distance < 20;
  } else {
    return false;
  }
}