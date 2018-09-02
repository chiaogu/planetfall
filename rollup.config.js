import copy from 'rollup-plugin-copy';
import browsersync from 'rollup-plugin-browsersync';
import minify from 'rollup-plugin-babel-minify';

export default ({ watch }) => ({
  input: 'src/index.js',
  output: {
    file: 'dist/b.js',
    format: 'iife'
  },
  plugins: [
    copy({
      'src/index.html': 'dist/index.html'
    }),
    minify(),
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
