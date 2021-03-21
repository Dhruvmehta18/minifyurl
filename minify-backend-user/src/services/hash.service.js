const shajs = require('sha.js');
const logger = require('../config/logger');
const MinifyUrl = require('../models/minifyUrl.model');
const { addMonths } = require('../utils/dateUtils');

const createHashUrl = async (linkBody ,userId) => {
  const { original_url: originalUrl } = linkBody;
  const now = new Date();
  const exprirationDate = addMonths(now, 6);
  const hashData = `${originalUrl}${now.getMilliseconds()}`;
  const shortLinkHash = shajs('sha256')
    .update(hashData)
    .digest('base64')
    .match(/([a-zA-Z0-9]{7})/)[0];
  const minifyUrlObj = {
    minifyId: shortLinkHash,
    originalLink: originalUrl,
    creationTime: now.toISOString(),
    expirationTime: exprirationDate.toISOString(),
    userId: userId
  };
  await MinifyUrl.setShortenUrl(minifyUrlObj);
  return minifyUrlObj;
};

const getUrl = async (minifyId = "", userId) => {
  const data = await MinifyUrl.getUrl(minifyId, userId);
  return data.Item;
};

const updateOriginalUrl = async (linkParams, linkBody, userId) => {
  const {minify_id: minifyId} = linkParams;
  const { original_url: originalLink } = linkBody;
  
  return (await MinifyUrl.updateOriginalUrl(minifyId, originalLink, userId));
};

const deleteUrl = async (linkParams, userId) => {
  const { minify_id: minifyId } = linkParams;
  return MinifyUrl.deleteUrl(minifyId, userId);
};

module.exports = {
  createHashUrl,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
};
