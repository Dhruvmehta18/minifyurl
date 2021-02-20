const express = require('express');
const path = require('path');
const referrerPolicy = require('referrer-policy');
const contentSecurityPolicy = require('helmet-csp');
const xss = require('xss-clean');
const crypto = require('crypto');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const hashRoute = require('./routes/v1/hash.route');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

// v1 api routes
app.use('/v1', routes);
app.use(
  '',
  (req, res, next)=>{
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    console.log(res.locals.nonce);
    next()
  },
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", (req, res) => `'nonce-${ res.locals.nonce }'`]
    },
  }),
  referrerPolicy({ policy: 'unsafe-url' }),
  hashRoute
);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
