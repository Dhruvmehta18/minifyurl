const Joi = require('joi');

const getOriginalUrl = {
    params: Joi.object().keys({
      minify_id: Joi.string().required()
    }),
  };

module.exports = {
    getOriginalUrl
}