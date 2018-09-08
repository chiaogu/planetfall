import { OBJECT_SATELLITE_STATION, OBJECT_BUILDING, STAGE_TITLE, STAGE_GAME } from './constants';

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
    name: 'Nadium',
    x: 0,
    y: 2010,
    radius: 2000,
    gravity: 0.05,
    color: {
      land: '#091A1E',
      atmosphere: [[0, '#4F3C6A'], [0.06, '#0E2A48']]
    },
    objects: [[30, OBJECT_SATELLITE_STATION, false]],
    bgs: [[1, 0, OBJECT_BUILDING, 0.2], [3, 2, OBJECT_BUILDING, 0.5], [6, 3, OBJECT_BUILDING, 1]]
  },
  {
    name: 'Catlax',
    x: -200,
    y: -2000,
    radius: 100,
    gravity: 0.05,
    color: {
      land: '#555',
      atmosphere: [[0, 'rgba(255,255,255,0.5)']]
    },
    objects: [[200, OBJECT_SATELLITE_STATION, false]],
    bgs: [[50, 0, OBJECT_BUILDING]]
  },
  {
    name: 'Kapbula',
    x: 0,
    y: -12010,
    radius: 2000,
    gravity: 0.02,
    color: {
      land: '#555',
      atmosphere: [[0, '#ff0']]
    },
    objects: [[180, OBJECT_SATELLITE_STATION, false]]
  }
];

export const character = {
  width: 5,
  height: 5 * 1.618
};

export const pressingKeys = {};

export const objectives = {
  savedPlanets: {}
};

export const radarWaves = [];

export const stage = {
  code: STAGE_GAME
};
