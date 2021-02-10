const RedirectUrl = require('../models/redirectUrl.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getOriginalUrl = async (minify_id) => {
  const data = await RedirectUrl.getOriginalUrl(minify_id);
  if (!data) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Some error happen on our side');
  }
  return data.$response.data.Item;
};

module.exports = {
    getOriginalUrl
};
