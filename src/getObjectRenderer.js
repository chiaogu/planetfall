import { OBJECT_SATELLITE_STATION, OBJECT_BUILDING, OBJECT_DUNE } from './constants';
import drawSatelliteStation from './drawSatelliteStation';
import drawBuilding from './drawBuilding';
import drawDune from './drawDune';

export default id => {
  switch (id) {
    case OBJECT_SATELLITE_STATION:
      return drawSatelliteStation;
    case OBJECT_BUILDING:
      return drawBuilding;
    case OBJECT_DUNE:
      return drawDune;
  }
};
