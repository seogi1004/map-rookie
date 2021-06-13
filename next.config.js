const withLess = require('next-with-less');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const {PHASE_PRODUCTION_BUILD} = require('next/constants');

const plugins = withPlugins(
  [
    [
      withLess,
      {
        cssModules: true,
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]',
        },
      },
    ],
    [withImages, {
      esModule: true,
    }],
  ],
  {
    distDir: '.next',
    compress: PHASE_PRODUCTION_BUILD,
    env: {
      PHASE: process.env.PHASE,
      VERSION: `${require('./package.json').version}`
    },
    future: {
      webpack5: true,
    },
  },
);

module.exports = plugins;
