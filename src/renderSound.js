import { isAccelerating } from './utils';
import { camera } from './models';
import { getDistanceToPlanetSurface } from './utils';

const audioContext = new AudioContext();
const bufferSize = 2 * audioContext.sampleRate;
const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}
const whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;
whiteNoise.start(0);

const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = 'lowpass';
biquadFilter.gain.setValueAtTime(25, audioContext.currentTime);
whiteNoise.connect(biquadFilter);

export function keyDown(key) {
  if (isAccelerating()) {
    biquadFilter.connect(audioContext.destination);
  }
}
export function keyUp(key) {
  biquadFilter.disconnect();
}
export function updateSound() {
  if (camera.planet) {
    const distance = getDistanceToPlanetSurface(camera.planet);
    const distanceRatio = 1 - distance / camera.planet.radius;
    biquadFilter.frequency.setValueAtTime(500 * distanceRatio + 500, audioContext.currentTime);
  }
}
