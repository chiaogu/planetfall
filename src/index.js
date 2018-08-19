import Planet from "./Planet";
import Camera from "./Camera";
import Monolith from "./Monolith";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let pressingKey;

const camera = new Camera();
const monolith = new Monolith();
const planet = new Planet();

const draw = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  camera.update(pressingKey);
  monolith.render(context, camera);
  planet.render(context, camera);

  requestAnimationFrame(draw);
};
draw();

window.addEventListener("keydown", ({keyCode}) => {
  pressingKey = keyCode;
});

window.addEventListener("keyup", event => {
  pressingKey = undefined;
});
