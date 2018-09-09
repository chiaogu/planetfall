import {
  OBJECT_SATELLITE_STATION,
  OBJECT_BUILDING,
  OBJECT_DUNE,
  OBJECT_CANYON,
  OBJECT_TREE,
  STAGE_TITLE,
  STAGE_GAME
} from './constants';

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
    name: 'Aolea',
    x: 0,
    y: 2010,
    radius: 2000,
    gravity: 0.05,
    color: {
      land: '#091A1E',
      atmosphere: [[0, '#4F3C6A'], [0.06, '#0E2A48']]
    },
    objects: [[0, OBJECT_SATELLITE_STATION, false]],
    bgs: [[2, 0, OBJECT_BUILDING, 0.2, 0.8], [3, 2, OBJECT_BUILDING, 0.5, 0.5], [6, 3, OBJECT_BUILDING, 1, 0.3]]
  },
  {
    name: 'Catlax',
    x: -200,
    y: -2000,
    radius: 200,
    gravity: 0.05,
    color: {
      land: '#555',
      atmosphere: [[0, 'rgba(255,255,255,0.3)']]
    },
    objects: [[200, OBJECT_SATELLITE_STATION, false]],
    bgs: [[120, 0, OBJECT_CANYON, 1, 0]]
  },
  {
    name: 'Kapbula',
    x: 0,
    y: -12010,
    radius: 3000,
    gravity: 0.035,
    color: {
      land: '#2E284B',
      atmosphere: [[0, '#FF9577'], [0.03, '#FF6D5B'], [0.2, '#50456E']]
    },
    objects: [[90, OBJECT_SATELLITE_STATION, false]],
    bgs: [[15, 0, OBJECT_DUNE, 1, 0.9], [5, 13, OBJECT_DUNE, 0.5, 0.85], [7.5, 7, OBJECT_DUNE, 0.7, 0.8], [5, 4, OBJECT_DUNE, 0.4, 0.75]]
  },
  {
    name: 'Nadium',
    x: 12010,
    y: 0,
    radius: 2000,
    gravity: 0.03,
    color: {
      land: '#112408',
      atmosphere: [[0,'#29573A'], [0.05, '#C4D6A5'],[0.2, '#BBC87A']]
    },
    objects: [[0, OBJECT_SATELLITE_STATION, false]],
    bgs: [[3, 4, OBJECT_TREE, 2, 0.5],[2, 0, OBJECT_TREE, 3, 0.35],[3, 4, OBJECT_TREE, 2.5, 0.3]]
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
