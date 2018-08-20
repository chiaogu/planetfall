import Planet from "./Planet";
import Camera from "./Camera";
import Monolith from "./Monolith";
import Background from "./Background";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const pressingKeys = {};

const camera = new Camera();
const background = new Background();
const planet = new Planet();
const monolith = new Monolith();

const draw = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let closetPlanet;
  if(camera.distance(planet, monolith) < 200) {
    closetPlanet = planet;
  }
  camera.update(pressingKeys, closetPlanet, monolith);
  // background.render(context, camera);
  planet.render(context, camera);
  monolith.render(context, camera);

  requestAnimationFrame(draw);
};
draw();

window.addEventListener("keydown", ({ keyCode }) => {
  pressingKeys[keyCode] = true;
});

window.addEventListener("keyup", ({ keyCode }) => {
  delete pressingKeys[keyCode];
});
