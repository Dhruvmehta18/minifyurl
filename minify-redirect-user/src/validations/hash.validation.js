const Joi = require('joi');
const { minifyId } = require('./custom.validation');

const getOriginalUrl = {
  params: Joi.object().keys({
    minify_id: Joi.string().required().custom(minifyId),
  }),
};

module.exports = {
  getOriginalUrl,
};
