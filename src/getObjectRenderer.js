import { OBJECT_SATELLITE_STATION, OBJECT_BUILDING, OBJECT_DUNE, OBJECT_CANYON } from './constants';
import drawSatelliteStation from './drawSatelliteStation';
import drawBuilding from './drawBuilding';
import drawDune from './drawDune';
import drawCanyon from './drawCanyon';

export default id => {
  switch (id) {
    case OBJECT_SATELLITE_STATION:
      return drawSatelliteStation;
    case OBJECT_BUILDING:
      return drawBuilding;
    case OBJECT_DUNE:
      return drawDune;
    case OBJECT_CANYON:
      return drawCanyon;
  }
};
