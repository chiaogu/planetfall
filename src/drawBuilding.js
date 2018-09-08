import { drawImage, transform, transformColorStops } from './utils';

export default (context, transformOnPlanet, [azimuth, scale]) => {
  const height = 200 * scale;
  const width = 120 * scale;
  const windowSize = 5 * scale;
  const windowGap = 20 * scale;
  drawImage(
    context,
    [
      {
        color: [0, -height / 2, 1, 10, [[0, `rgb(30,55,91)`], [1, `rgb(101,121,101)`]]],
        paths: [[-width / 2, 10], [-width / 2, -height], [width / 2, -height], [width / 2, 10]]
      },
      ...Array(20)
        .fill()
        .map((_, index) => {
          const xOffset = windowGap * (index % 5);
          const yOffset = windowGap * (Math.round(index / 5));
          return {
            color: '#fff',
            paths: [
              [-width / 2 + xOffset, -height + yOffset],
              [-width / 2 + xOffset + windowSize * 2, -height + yOffset],
              [-width / 2 + xOffset + windowSize * 2, -height + windowSize + yOffset],
              [-width / 2 + xOffset, -height + windowSize + yOffset]
            ]
          };
        })
    ].map(({ color, paths }) => {
      return {
        color: transformColorStops(color, transformOnPlanet),
        paths: paths.map(([x, y]) => transformOnPlanet(x, y))
      };
    })
  );
};
