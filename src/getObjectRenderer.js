import { OBJECT_SATELLITE_STATION } from './constants';
import drawSatelliteStation from './drawSatelliteStation';

export default (id) => {
  switch(id) {
    case OBJECT_SATELLITE_STATION:
      return drawSatelliteStation;
  }
}