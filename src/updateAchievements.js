import { pressingKeys, achievements, camera } from './models';
import { getDistanceToPlanetSurface, getAngle } from './utils';
import { OBJECT_SATELLITE_STATION } from './constants';

export default () => {
  const planet = camera.planet;
  if (pressingKeys[32] && planet) {
    const distance = getDistanceToPlanetSurface(planet);
    if (distance < 1) {
      const azimuth = getAngle(planet, camera);
      const satelliteStation = planet.objects.find(object => object[1] === OBJECT_SATELLITE_STATION);
      if(satelliteStation) {
        let angleDiff = Math.abs(satelliteStation[0] - azimuth);
        angleDiff = angleDiff > 180 ? 360 - angleDiff : angleDiff;
        if (angleDiff < 4 && !achievements.savedPlanets[planet.name]) {
          achievements.savedPlanets[planet.name] = true;
        }
      }
    }
  }
}