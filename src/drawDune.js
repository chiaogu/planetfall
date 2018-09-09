import { drawImageOnPlanet } from './utils';

export default (context, transformOnPlanet, [azimuth, scale]) => {
  const height = 80;
  const width = 480;
  const root = 20;
  drawImageOnPlanet(context, transformOnPlanet, [
    {
      color: [0, 1, -width / 2, 1, [[0, '#4F4874'], [0.5, '#905778']]],
      paths: [[-width / 2, root], [0, -height], [width / 2, root]]
    },
    {
      color: [0, -height, width / 4, 1, [[0, '#FE8265'], [0.25,'#AE5B72'], [1, '#905778']]],
      paths: [
        [width / 16, root],
        [-width / 16, -height * 0.6],
        [width / 128, -height * 0.8],
        [-width / 64, -height * 0.9],
        [0, -height - 0.1],
        [width / 2, root - 0.1]
      ]
    }
  ]);
};
