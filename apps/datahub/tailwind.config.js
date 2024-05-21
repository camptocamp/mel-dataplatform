const baseConfig = require('../../node_modules/geonetwork-ui/tailwind.base.config')
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

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
        'primary-dark': '#AB0107',
        'primary-light': '#FACED2',
        beige: '#F7F5F0',
        secondary: '#007A80',
        'secondary-dark': '#004E52',
        'secondary-light': '#A1DBDE',
        'gray-1': '#000000',
        'gray-2': '#4C4C4C',
        'gray-3': '#646464',
        'gray-4': '#7C7C7C',
        'gray-5': '#A1A1A1',
        'gray-6': '#CCCDD2',
        'gray-7': '#EEEEEE',
        'gray-8': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
