import { STAGE_TITLE, STAGE_GAME, STAGE_ENDING, FONT } from './constants';
import { camera, pressingKeys, stage } from './models';

let _stage = STAGE_TITLE;

export default context => {
  if (_stage === STAGE_TITLE) {
    drawTitle(context);
  }

  if(pressingKeys[32]) {
    stage.code = STAGE_GAME;
  }

  _stage = stage.code;
};

function drawTitle(context) {
  camera.zoom = 15;

  context.fillStyle = '#000';
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  context.shadowColor = '#fff';
  context.shadowBlur = 20;
  context.textAlign = 'center';
  context.fillStyle = '#fff';

  context.font = `72px ${FONT}`;
  context.fillText('G R A V I T Y', window.innerWidth / 2, window.innerHeight / 5);

  context.font = `24px ${FONT}`;
  context.fillText('Press space to start', window.innerWidth / 2, window.innerHeight * 0.8 );

  context.shadowBlur = 0;
}
