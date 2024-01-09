const baseConfig = require('../../node_modules/geonetwork-ui/tailwind.base.config');
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  content: [
    './node_modules/geonetwork-ui/**/*.mjs',
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E30513',
        beige: '#F7F5F0',
      },
    },
  },
  plugins: [],
};
