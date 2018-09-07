import { drawImage, transform } from './utils';

const LAYERS = [
  {
    _color: [0, -100, 1, 1, [[0, '#0E2A48'], [1, '#4F3C6A']]],
    paths: [[-20, 0], [20, 0], [20, -100], [-20, -100]]
  },
  {
    _color: '#eee',
    paths: []
  }
];

export default (context, transformOnPlanet, state) => {
  drawImage(
    context,
    LAYERS.map(({ _color, paths }) => {
      let color;
      if (typeof _color === 'string') {
        color = _color;
      } else {
        const [x1, y1, x2, y2, stops] = _color;
        const { x: _x1, y: _y1 } = transformOnPlanet(x1, y1);
        const { x: _x2, y: _y2 } = transformOnPlanet(x2, y2);
        color = [_x1, _y1, _x2, _y2, stops];
      }
      return {
        color,
        paths: paths.map(([x, y]) => transformOnPlanet(x, y))
      };
    })
  );
};
