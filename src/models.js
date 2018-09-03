export const camera = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  vr: 0,
  zoom: 1,
  rotaion: 0,
  isJumping: false,
  fuel: 100,
  planet: undefined
};

export const planets = [
  {
    x: 0,
    y: 2010,
    radius: 2000,
    gravity: 0.05,
    satelliteStationAzimuth: 90,
    name: 'Nadium'
  },
  {
    x: -200,
    y: -2000,
    radius: 100,
    gravity: 0.05,
    satelliteStationAzimuth: 200,
    name: 'Catlax'
  },
  {
    x: 0,
    y: -12010,
    radius: 2000,
    gravity: 0.02,
    satelliteStationAzimuth: 180,
    name: 'Kapbula'
  }
];

export const character = {
  width: 5,
  height: 5 * 1.618,
};

export const pressingKeys = {};
