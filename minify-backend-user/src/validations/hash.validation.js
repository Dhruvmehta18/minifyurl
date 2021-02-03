const Joi = require('joi');

const createHashUrl = {
    body: Joi.object().keys({
      original_url: Joi.string().required().uri()
    }),
  };

const getUrl = {
    
}

module.exports = {
    createHashUrl
}