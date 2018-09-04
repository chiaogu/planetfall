import { pressingKeys } from './models';
import updateCamera from './updateCamera';
import updateAchievements from './updateAchievements';
import drawPlanets from './drawPlanets';
import drawCharacter from './drawCharacter';
import drawStars from './drawStars';
import drawDashboard from './drawDashboard';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

window.addEventListener('keydown', ({ keyCode }) => (pressingKeys[keyCode] = true));
window.addEventListener('keyup', ({ keyCode }) => delete pressingKeys[keyCode]);

function tick() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  updateCamera();
  updateAchievements();
  drawStars(context);
  drawPlanets(context);
  drawCharacter(context);
  drawDashboard(context);

  requestAnimationFrame(tick);
};
tick();

