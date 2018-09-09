import { drawImageOnPlanet, transform } from './utils';

const LAYERS = [
  {
    color: '#fff',
    paths: [
      [7.2, -49.4],
      [4.8, -47],
      [-15.6, -21.8],
      [-17, -16.4],
      [-11.6, -14.8],
      [0, -19.2],
      [1, -16.4],
      [3, -15.6],
      [2.8, -14.4],
      [-3, -8.2],
      [-3.4, 9.4],
      [15.6, 10.6],
      [15.2, -7.4],
      [10.2, -14],
      [10.2, -16],
      [13.2, -15.8],
      [16.6, -18.6],
      [18.4, -25.6],
      [13.2, -29],
      [12, -32.8],
      [9.6, -34.4],
      [12.2, -43.4],
      [11.6, -46.8],
      [8.6, -50]
    ]
  },
  {
    color: '#eee',
    paths: [
      [8.5, -50],
      [9, -44.2],
      [7.4, -38],
      [3, -30.6],
      [-1.2, -25.6],
      [-6.8, -20.6],
      [-11.6, -17.4],
      [-16.8, -16.2],
      [-17, -16.4],
      [-14.6, -15.4],
      [-11.4, -14.8],
      [-9.6, -15.4],
      [-7.2, -16.4],
      [-0.2, -19],
      [4.8, -20.6],
      [8.4, -26],
      [11.6, -32.4],
      [10.4, -34.2],
      [9.8, -35.6],
      [10.6, -37.8],
      [12.2, -44.2],
      [11.5, -46.8],
      [10.2, -48.6],
      [10.2, -49]
    ]
  },
  {
    color: '#eee',
    paths: [
      [-10.8, -22.2],
      [-9.8, -36.8],
      [7.6, -40],
      [7.6, -39.2],
      [-7.4, -36.2],
      [-7.8, -34.8],
      [-1.2, -26.2],
      [-2, -25.4],
      [-8.4, -34],
      [-9.4, -34],
      [-10.2, -22.2]
    ]
  }
];

let _radius = 20;
let delta = 1;

export default (context, transformOnPlanet, isOffline) => {
  drawImageOnPlanet(context, transformOnPlanet, LAYERS);

  const { x, y } = transformOnPlanet(-9.8, -36.8);
  const radius = transform(_radius * (isOffline ? 0.8 : 1));
  const grd = context.createRadialGradient(x, y, 0, x, y, radius);
  const color = isOffline ? [254, 0, 24] : [19, 167, 76];
  grd.addColorStop(0, '#fff');
  grd.addColorStop(0.3, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`);
  grd.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
  context.fillStyle = grd;
  context.beginPath();
  context.arc(x, y, transform(20), 0, 2 * Math.PI);
  context.fill();

  _radius += 0.01 * delta;
  if (_radius <= 15) delta = 1;
  if (_radius >= 20) delta = -1;
};
