import copy from 'rollup-plugin-copy';
import visualizer from 'rollup-plugin-visualizer';
import browsersync from 'rollup-plugin-browsersync';

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "hi"
  },
  plugins: [
    copy({
      "src/index.html": "dist/index.html"
    }),
    visualizer(),
    browsersync({server: 'dist'})
  ],
  watch: {
    include: 'src/**'
  }
};
