const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const MinifyUrl = require('./models/minifyUrl.model');
const ApiError = require('./utils/ApiError');

let server;

// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info('Connected to MongoDB');
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });
// });

server = app.listen(config.port, async () => {
  logger.info(`Listening to port ${config.port}`);

  if (config.env === 'development') {
    const data = await MinifyUrl.createTable();
    if (!data) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Some error happen on our side');
    }
  }
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
