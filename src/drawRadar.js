import { camera, radarWaves, pressingKeys, planets, objectives } from './models';
import { transform, getPositionOnPlanetSurface, white, isNearStaelliteStation } from './utils';
import { OBJECT_SATELLITE_STATION } from './constants';

let isPressed = false;

export default context => {
  if (pressingKeys[32] && !isNearStaelliteStation()) {
    if (!isPressed) {
      isPressed = true;
      radarWaves.push({
        send: true,
        r: 0,
        v: 0,
        x: camera.x,
        y: camera.y,
        echo: false
      });
    }
  } else {
    isPressed = false;
  }
  for (let i = radarWaves.length - 1; i >= 0; i--) {
    const wave = radarWaves[i];

    wave.v += wave.v < 5 ? 0.1 : 0;
    wave.r += wave.v * wave.v;
    drawWave(context, wave);

    if (!wave.send) {
      if (
        wave.r / Math.hypot(camera.x - wave.x, camera.y - wave.y) >= 2 &&
        transform(wave.r - Math.hypot(camera.x - wave.x, camera.y - wave.y)) >=
          Math.hypot(window.innerWidth, window.innerHeight)
      ) {
        radarWaves.splice(i, 1);
      }
      continue;
    }

    for (let j = 0; j < planets.length; j++) {
      const planet = planets[j];
      const { savedPlanets } = objectives;
      if (savedPlanets[planet.name]) continue;

      const satelliteStation = planet.objects.find(object => object[1] === OBJECT_SATELLITE_STATION);
      if (!satelliteStation) continue;

      const { x, y } = getPositionOnPlanetSurface(planet, satelliteStation[0]);
      const distance = Math.hypot(camera.x - x, camera.y - y);
      if (wave.r >= distance && !wave.echo) {
        wave.echo = true;
        radarWaves.push({
          r: 0,
          v: 0,
          x,
          y
        });
        break;
      }
    }

    if (wave.echo && transform(wave.r) > Math.hypot(window.innerWidth, window.innerHeight)) {
      radarWaves.splice(i, 1);
    }
  }
};

function drawWave(context, wave) {
  const { x, y } = transform(wave.send ? camera : wave);
  const r = transform(wave.r);
  const grd = context.createRadialGradient(x, y, r * 0.5, x, y, r);
  grd.addColorStop(0, white(0));
  grd.addColorStop(1, white(0.3));
  context.fillStyle = grd;
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fill();
}
