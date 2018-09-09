import {
  OBJECT_SATELLITE_STATION,
  OBJECT_BUILDING,
  OBJECT_DUNE,
  OBJECT_CANYON,
  OBJECT_TREE,
  OBJECT_BUILDING_2,
  STAGE_TITLE,
  STAGE_GAME,
  KAPBULA_DUNE_COLOR,
  CATLAX_DUNE_COLOR,
  CATLAX_CANYON_COLOR,
  ESKIRI_DUNE_COLOR,
  ESKIRI_CANYON_COLOR
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
    y: 2020,
    radius: 2000,
    gravity: 0.05,
    color: {
      land: '#091A1E',
      atmosphere: [[0, '#4F3C6A'], [0.1, '#0E2A48']]
    },
    objects: [[30, OBJECT_SATELLITE_STATION, false]],
    bgs: [[2, 0, OBJECT_BUILDING, 1.75, 0.7], [6, 3, OBJECT_BUILDING_2, 2.75, 0.6], [3, 2, OBJECT_BUILDING, 2.25, 0.5], [6, 3, OBJECT_BUILDING_2, 3.25, 0.3]]
  },
  {
    name: 'Catlax',
    x: -600,
    y: -1900,
    radius: 200,
    gravity: 0.05,
    color: {
      land: '#555',
      atmosphere: [[0, 'rgba(255,255,255,0.3)']]
    },
    objects: [[200, OBJECT_SATELLITE_STATION, false]],
    bgs: [
      [40, 3, OBJECT_DUNE, 0.1, 0, ...CATLAX_DUNE_COLOR],
      [40, 10, OBJECT_DUNE, 0.1, 0, ...CATLAX_DUNE_COLOR],
      [120, 0, OBJECT_CANYON, 1, 0, ...CATLAX_CANYON_COLOR],
      [80, 10, OBJECT_CANYON, 0.5, 0, ...CATLAX_CANYON_COLOR]
    ]
  },
  {
    name: 'Kapbula',
    x: 0,
    y: -12010,
    radius: 2000,
    gravity: 0.035,
    color: {
      land: '#2E284B',
      atmosphere: [[0, '#FF9577'], [0.03, '#FF6D5B'], [0.2, '#50456E']]
    },
    objects: [[90, OBJECT_SATELLITE_STATION, false]],
    bgs: [
      [15, 0, OBJECT_DUNE, 1, 0.9, ...KAPBULA_DUNE_COLOR],
      [5, 13, OBJECT_DUNE, 0.5, 0.85, ...KAPBULA_DUNE_COLOR],
      [7.5, 7, OBJECT_DUNE, 0.7, 0.8, ...KAPBULA_DUNE_COLOR],
      [5, 4, OBJECT_DUNE, 0.4, 0.75, ...KAPBULA_DUNE_COLOR]
    ]
  },
  {
    name: 'Nadium',
    x: 12010,
    y: 0,
    radius: 2000,
    gravity: 0.03,
    color: {
      land: '#112408',
      atmosphere: [[0,'#29573A'], [0.05, '#C4D6A5'],[0.1, '#BBC87A']]
    },
    objects: [[0, OBJECT_SATELLITE_STATION, false]],
    bgs: [[3, 4, OBJECT_TREE, 2, 0.5],[2, 0, OBJECT_TREE, 3, 0.35],[3, 4, OBJECT_TREE, 2.5, 0.3]]
  },
  {
    name: 'Eskiri',
    x: 12010,
    y: 10010,
    radius: 1000,
    gravity: 0.05,
    color: {
      land: '#E9EEF2',
      atmosphere: [[0, '#EAEFF2'], [0.1, '#8CA9BF'], [0.24, '#4A5E7A']]
    },
    objects: [[0, OBJECT_SATELLITE_STATION, false]],
    bgs: [
      [20, 0, OBJECT_DUNE, 0.5, 0.9, ...ESKIRI_DUNE_COLOR],
      [20, 10, OBJECT_CANYON, 1, 0.85, ...ESKIRI_CANYON_COLOR],
      [20, 10, OBJECT_DUNE, 0.3, 0.8, ...ESKIRI_DUNE_COLOR]
    ]
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
  code: STAGE_TITLE
};
