import { isAccelerating } from './utils';
import { camera, pressingKeys, radarWaves } from './models';
import { getDistanceToPlanetSurface, isNearStaelliteStation } from './utils';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
// AudioContext must be resumed after the document received a user gesture to enable audio playback.
window.audioContext = audioContext;

const whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = noise();
whiteNoise.loop = true;
whiteNoise.start(0);
const rokcetLaunching = audioContext.createBiquadFilter();
rokcetLaunching.type = 'lowpass';
whiteNoise.connect(rokcetLaunching);

const radar = audioContext.createOscillator();
radar.type = 'sine';
radar.start();

const radarReverb = audioContext.createConvolver();
radarReverb.buffer = impulseResponse(4, 4, false);
radarReverb.connect(audioContext.destination);

const satellite = audioContext.createOscillator();
satellite.type = 'square';
satellite.start();

const satelliteFilter = audioContext.createBiquadFilter();
satelliteFilter.type = 'lowpass';
satellite.connect(satelliteFilter);

const satelliteReverb = audioContext.createConvolver();
satelliteReverb.buffer = impulseResponse(1, 5, false);
satelliteReverb.connect(audioContext.destination);

let playingRadarSound = false;
let satelliteFrequency = 0;

export default () => {
  if (camera.planet) {
    const distance = getDistanceToPlanetSurface(camera.planet);
    const distanceRatio = 1 - distance / camera.planet.radius;
    rokcetLaunching.frequency.setValueAtTime(250 * distanceRatio + 250, audioContext.currentTime);
  }

  if (isAccelerating()) {
    rokcetLaunching.connect(audioContext.destination);
  } else {
    rokcetLaunching.disconnect();
  }

  const echoWave = radarWaves.find(wave => !wave.send);
  const isEchoArrived = echoWave && echoWave.r > Math.hypot(camera.x - echoWave.x, camera.y - echoWave.y);

  if (pressingKeys[32]) {
    radar.frequency.setValueAtTime(1046, audioContext.currentTime);
  } else if (isEchoArrived) {
    radar.frequency.setValueAtTime(440 + Math.max(0, 440 - (echoWave.r / 4000) * 440), audioContext.currentTime);
  }

  if ((pressingKeys[32] && !isNearStaelliteStation()) || isEchoArrived) {
    if (playingRadarSound) return;
    radar.connect(radarReverb);
    playingRadarSound = true;
    setTimeout(() => radar.disconnect(), 100);
  } else {
    radar.disconnect();
    playingRadarSound = false;
  }

  if (pressingKeys[32] && isNearStaelliteStation()) {
    satelliteFrequency = 110;
  }

  if (satelliteFrequency <= 10) {
    satelliteFilter.disconnect();
  } else {
    satellite.frequency.setValueAtTime(satelliteFrequency, audioContext.currentTime);
    satelliteFilter.frequency.setValueAtTime(satelliteFrequency * 2, audioContext.currentTime);
    satelliteFrequency -= 1;
    satelliteFilter.connect(satelliteReverb);
  }
};

function impulseResponse(duration, decay = 2.0, reverse) {
  const sampleRate = audioContext.sampleRate;
  const length = sampleRate * duration;
  const impulse = audioContext.createBuffer(2, length, sampleRate);
  const impulseL = impulse.getChannelData(0);
  const impulseR = impulse.getChannelData(1);

  for (let i = 0; i < length; i++) {
    const n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }
  return impulse;
}

function noise() {
  const bufferSize = 2 * audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}
