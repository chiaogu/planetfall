import { pressingKeys } from './models';
import updateCamera from './updateCamera';
import updateObjective from './updateObjective';
import { drawPlanets, drawAtmosphere, drawObjects, drawBackground } from './drawPlanets';
import drawCharacter from './drawCharacter';
import drawStars from './drawStars';
import drawDashboard from './drawDashboard';
import drawRadar from './drawRadar';
import drawStage from './drawStage';
import {keyDown, keyUp, updateSound} from './renderSound'

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

window.addEventListener('keydown', ({ keyCode }) => {
  pressingKeys[keyCode] = true;
  keyDown(keyCode);
});
window.addEventListener('keyup', ({ keyCode }) => {
  delete pressingKeys[keyCode];
  keyUp(keyCode);
});

function tick() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  updateCamera();
  updateObjective();
  updateSound();
  drawStars(context);
  drawAtmosphere(context);
  drawBackground(context);
  drawObjects(context);
  drawPlanets(context);
  drawStage(context);
  drawRadar(context);
  drawDashboard(context);
  drawCharacter(context);

  requestAnimationFrame(tick);
}
tick();
