const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EventPulse API',
      version: '1.0.0',
      description: 'Event management platform REST API',
    },
    servers: [{ url: '/api' }],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);