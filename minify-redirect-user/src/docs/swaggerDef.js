const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  swagger: '2.0',
  info: {
    title: 'Minify Redirect API documentation',
    description: 'This a documentation for Minify Redirect API and service.',
    version: `${version}`,
    license: {
      name: 'MIT',
      url: '',
    },
  },

  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
