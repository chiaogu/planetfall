import html from '@rollup/plugin-html';
import browsersync from 'rollup-plugin-browsersync';
import minify from 'rollup-plugin-babel-minify';
import template from './template.js';

export default ({ watch }) => ({
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife'
  },
  plugins: [
    minify(),
    html({ template }),
    watch
      ? browsersync({
          server: 'dist',
          open: false
        })
      : {}
  ],
  watch: {
    include: 'src/**'
  }
});
