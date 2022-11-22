import { drawImageOnPlanet } from './utils';

const layer = [[-3.2,5.4],[-1.6,-12],[-1.8,-25.4],[-1.8,-33.2],[-7.6,-39.4],[-10.6,-40.8],[-12.2,-40.8],[-12.4,-41.8],[-14,-42.8],[-15.4,-41.8],[-16.4,-43.4],[-15.4,-45.6],[-12.2,-44.6],[-12,-46],[-10.2,-46],[-9.2,-45.2],[-6.8,-46.2],[-5.8,-44.2],[-2.8,-41.8],[-2.8,-41],[-5.6,-41.4],[-5.6,-40.4],[-7.4,-41],[-4.6,-38],[-0.8,-35],[-1.8,-38.8],[-1,-40.6],[-1.8,-44.2],[-3,-43.4],[-4.6,-45.8],[-4.4,-46.6],[-7.2,-47],[-7.8,-48],[-7.4,-49],[-12,-50.4],[-16,-49.6],[-19.6,-50.8],[-22.2,-50.4],[-22.6,-53.4],[-22,-56.8],[-22.4,-58.4],[-18.6,-56.8],[-18,-58.6],[-13.2,-60.2],[-9.8,-59.4],[-9.4,-60.2],[-14.6,-62.4],[-14.8,-62.8],[-13.4,-65.2],[-11.4,-65.2],[-8.8,-64.2],[-6.4,-65.2],[-6.4,-65.6],[-3.2,-66.2],[-1.2,-65.2],[-0.4,-67],[1,-66.2],[3.2,-66.8],[10.6,-63.6],[10.6,-61.4],[13.2,-61.6],[14.8,-60.6],[16.8,-60.4],[16.4,-59.4],[20.6,-56.8],[20.8,-55.2],[15,-54.6],[9,-55.8],[12,-53.6],[17,-54],[19.6,-53.2],[19.6,-51.6],[17.8,-50.8],[20.4,-50.2],[22,-51],[23.6,-47.6],[21,-46.2],[21.6,-44.8],[20.2,-43.6],[18.8,-45.2],[16.4,-44.6],[12.8,-45.6],[7.6,-47.8],[4.2,-49.4],[4.2,-51.2],[1,-49.6],[0.8,-48.4],[3.2,-48.6],[6.8,-46.8],[11.4,-44],[5.2,-43],[5.6,-41.6],[4.4,-41.8],[3.8,-43.8],[1.4,-44],[1.8,-40.8],[1,-36.8],[0.8,-27.8],[1.2,-11.2],[1,4.6],[1.2,6.4]];

export default (context, transformOnPlanet, [azimuth, scale]) => {
  drawImageOnPlanet(context, transformOnPlanet, [
    {
      color: [0,-70,0,10, [[0, '#B5C054'], [0.2,'#1E8152'],[0.5,'#112408']]],
      paths: layer
    }
  ]);
};