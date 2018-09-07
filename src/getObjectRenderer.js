import { OBJECT_SATELLITE_STATION, OBJECT_BUILDING } from './constants';
import drawSatelliteStation from './drawSatelliteStation';
import drawBuilding from './drawBuilding';

export default (id) => {
  switch(id) {
    case OBJECT_SATELLITE_STATION:
      return drawSatelliteStation;
    case OBJECT_BUILDING:
     return drawBuilding;
  }
}