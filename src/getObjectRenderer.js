import { OBJECT_SATELLITE_STATION, OBJECT_BUILDING, OBJECT_DUNE, OBJECT_CANYON, OBJECT_TREE } from './constants';
import drawSatelliteStation from './drawSatelliteStation';
import drawBuilding from './drawBuilding';
import drawDune from './drawDune';
import drawCanyon from './drawCanyon';
import drawTree from './drawTree';

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
    case OBJECT_TREE:
      return drawTree;
  }
};
