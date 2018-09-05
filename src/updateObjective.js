import { pressingKeys, objectives, camera } from './models';
import { getPositionOnPlanetSurface } from './utils';
import { OBJECT_SATELLITE_STATION } from './constants';

let isPressingSpace = false;

export default () => {
  const planet = camera.planet;
  if (pressingKeys[32] && planet) {
    if(isPressingSpace) return;
    isPressingSpace = true;
    const satelliteStation = planet.objects.find(object => object[1] === OBJECT_SATELLITE_STATION);
    const satelliteStationPosition = getPositionOnPlanetSurface(planet, satelliteStation[0]);
    const distance = Math.hypot(camera.x - satelliteStationPosition.x, camera.y - satelliteStationPosition.y);
    if (distance < 20) {
      objectives.savedPlanets[planet.name] = true;
      satelliteStation[2] = true;
    }
  } else {
    isPressingSpace = false;
  }
}