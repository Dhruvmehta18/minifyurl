const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const MinifyUrlDynamo = require('./models/minifyUrlDynamo.model');

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Connected to MongoDB');

    server = app.listen(config.port, async () => {
      logger.info(`Listening to port ${config.port}`);

      if (config.env === 'development') {
        try {
          await MinifyUrlDynamo.createTable();
        } catch (err) {
          logger.error(err);
        }
      }
    });
  })
  .catch((e) => {
    logger.error(e);
  });

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
