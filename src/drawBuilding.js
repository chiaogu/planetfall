import { drawImage, transform } from './utils';

const LAYERS = [
  {
    color: [0, -100, 1, 1, [[0, '#1E375B'], [1, '#A2AF69']]],
    paths: [[-30, 10], [30, 10], [30, -200], [20, -220], [-30, -200]]
  },
  {
    color: [0, -100, 1, 1, [[0, '#223E59'], [1, '#5C9663']]],
    paths: [[20, -220], [20, 10], [30, 10], [30, -200]]
  }
];

export default (context, transformOnPlanet, azimuth) => {
  drawImage(
    context,
    LAYERS.map(({ color, paths }) => {
      let _color;
      if (typeof color === 'string') {
        _color = color;
      } else {
        const [x1, y1, x2, y2, stops] = color;
        const { x: _x1, y: _y1 } = transformOnPlanet(x1, y1);
        const { x: _x2, y: _y2 } = transformOnPlanet(x2, y2);
        _color = [_x1, _y1, _x2, _y2, stops];
      }
      return {
        color: _color,
        paths: paths.map(([x, y]) => transformOnPlanet(x, y))
      };
    })
  );
};
