import { findAngle } from './utils';

export default class Achievement {
  constructor(planets) {
    this.achievements = planets.reduce((map, planet) => {
      map[planet.name] = false;
      return map;
    }, {})
  }

  update(camera, planet, pressingKeys, monolith) {
    if (pressingKeys[32] && planet) {
      const distance = camera.distance(planet, monolith);
      if (distance < 1) {
        const azimuth = findAngle(planet, camera);
        let angleDiff = Math.abs(planet.satelliteStationAzimuth - azimuth);
        angleDiff = angleDiff > 180 ? 360 - angleDiff : angleDiff;
        if (angleDiff < 4 && !this.achievements[planet.name]) {
          this.achievements[planet.name] = true;
        }
      }
    }
  }
}
