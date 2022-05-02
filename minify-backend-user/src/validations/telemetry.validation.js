const Joi = require('joi');

const getTelemetryDataForMonth = {
  query: Joi.object()
    .keys({
      minifyId: Joi.string(),
      clickMonth: Joi.number().min(1).max(12).required(),
      clickYear: Joi.number().min(2000).max(10e+6).required(),
    }),
};

module.exports = {
  getTelemetryDataForMonth,
};
