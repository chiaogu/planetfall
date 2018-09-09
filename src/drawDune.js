import { drawImageOnPlanet } from './utils';
const height = 80;
const width = 480;
const root = 20;

export default (context, transformOnPlanet, [azimuth, scale, color]) => {
  drawImageOnPlanet(context, transformOnPlanet, [
    {
      color: [0, 1, -width / 2, 1, [[0, color[0]], [1, color[3]]]],
      paths: [[-width / 2, root], [0, -height], [width / 2, root]]
    },
    {
      color: [0, -height, width / 4, 1, [[0, color[1]], [0.25, color[2]], [1, color[3]]]],
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
