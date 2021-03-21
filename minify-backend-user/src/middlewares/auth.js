const httpStatus = require('http-status');
const request = require('request');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const auth = () => (req, _res, next) => {
  request.post(
    {
      headers: { 'content-type': 'application/json', authorization: req.headers.authorization },
      url: `${config.services.authService.endpoint}/checkToken`,
    },
    (err, heroResponse, body) => {
      if (!err && heroResponse.statusCode === httpStatus.OK) {
        const jsonBody = JSON.parse(body);
        const userId = jsonBody.userId;
        req.userId = userId;
        next();
      } else {
        if (err) {
          next(err);
        } else {
          next(new ApiError(heroResponse.statusCode, httpStatus[`${heroResponse.statusCode}_MESSAGE`]));
        }
      }
    }
  );
};

module.exports = auth;
