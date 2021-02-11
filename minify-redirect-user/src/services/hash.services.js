const httpStatus = require('http-status');
const RedirectUrl = require('../models/redirectUrl.model');
const ApiError = require('../utils/ApiError');

const getOriginalUrl = async (minify_id) => {
  try{
    const data = await RedirectUrl.getOriginalUrl(minify_id);
    return data.Item;
  } catch(error){
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something happen on our side');
  }
};

module.exports = {
    getOriginalUrl
};
