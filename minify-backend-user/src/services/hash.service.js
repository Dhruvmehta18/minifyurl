var shajs = require('sha.js');
const MinifyUrl = require('../models/minifyUrl.model');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createHashUrl = async (linkBody) => {
  const original_url = linkBody.original_url;
  const now = new Date();
  const hashData = `${original_url}${now.getMilliseconds()}`;
  const shortLinkHash = shajs('sha256')
    .update(hashData)
    .digest('base64')
    .match(/([a-zA-Z0-9]{7})/)[0];
  const minifyUrlObj = {
    hash: shortLinkHash,
    originalLink: original_url,
    creationTime: now.toISOString(),
    expirationTime: now.toISOString(),
  };
  const data = await MinifyUrl.setShortenUrl(minifyUrlObj);
  if (!data) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Some error happen on our side');
  }
  const hashUrlObj = {
    ...minifyUrlObj,
  };
  return hashUrlObj;
};

module.exports = {
  createHashUrl,
};
