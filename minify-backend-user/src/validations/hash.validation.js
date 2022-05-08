const Joi = require('joi');

const createHashUrl = {
  body: Joi.object().keys({
    original_url: Joi.string().required().uri(),
  }),
};

const getUrl = {
  params: Joi.object().keys({
    minify_id: Joi.string().required(),
  }),
};

const updateOriginalUrl = {
  body: Joi.object().keys({
    original_url: Joi.string().required().uri(),
    minify_id: Joi.string().required(),
  }),
};

const deleteUrl = {
  body: Joi.object().keys({
    minify_id: Joi.string().required(),
  }),
};

module.exports = {
  createHashUrl,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
};
