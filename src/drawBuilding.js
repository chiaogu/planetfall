import { drawImageOnPlanet } from './utils';

const height = 200;
const width = 120;
const windowSize = 5;
const windowGap = 20;

export default (context, transformOnPlanet, [azimuth, scale]) => {
  drawImageOnPlanet(
    context,
    transformOnPlanet,
    [
      {
        color: [0, -height, 1, 10, [[0, `#091A1E`], [0.6, `rgb(10,35,71)`], [1, `rgb(101,121,101)`]]],
        paths: [[-width / 2, 10], [-width / 2, -height], [width / 2, -height], [width / 2, 10]]
      },
      ...Array(20)
        .fill()
        .map((_, index) => {
          const xOffset = windowGap * (index % 5) + 17;
          const yOffset = windowGap * Math.floor(index / 5) + 15;
          return {
            color: '#fff',
            shadow: ['#9DB163', 20],
            paths:
              index % ((azimuth * scale * 10) % 7) === 0
                ? []
                : [
                    [-width / 2 + xOffset, -height + yOffset],
                    [-width / 2 + xOffset + windowSize, -height + yOffset],
                    [-width / 2 + xOffset + windowSize, -height + windowSize * 2 + yOffset],
                    [-width / 2 + xOffset, -height + windowSize * 2 + yOffset]
                  ]
          };
        })
    ]
  );
};
