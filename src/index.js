import Planet from './Planet';
import Camera from './Camera';
import Monolith from './Monolith';
import Stars from './Stars';
import Dashboard from './Dashboard';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const pressingKeys = {};

const camera = new Camera();
const stars = new Stars();
const planets = [
  new Planet({ x: 0, y: 2010, radius: 2000, gravity: 0.05 }),
  new Planet({ x: -200, y: -2000, radius: 100, gravity: 0.05 }),
  new Planet({ x: 0, y: -12010, radius: 2000, gravity: 0.02 })
];
const monolith = new Monolith();
const dashboard = new Dashboard();

const draw = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars.render(context, camera);
  let closetPlanet;
  let closetDistance = Number.MAX_VALUE;
  planets.forEach(planet => {
    planet.render(context, camera)
    const distance = camera.distance(planet, monolith);
    if (distance < planet.radius && distance < closetDistance) {
      closetPlanet = planet;
      closetDistance = distance;
    }
  });
  camera.update(pressingKeys, closetPlanet, monolith);
  monolith.render(context, camera, closetPlanet, pressingKeys);
  dashboard.render({context, camera, planets, closetPlanet});

  requestAnimationFrame(draw);
};
draw();

window.addEventListener('keydown', ({ keyCode }) => {
  pressingKeys[keyCode] = true;
});

window.addEventListener('keyup', ({ keyCode }) => {
  delete pressingKeys[keyCode];
});
