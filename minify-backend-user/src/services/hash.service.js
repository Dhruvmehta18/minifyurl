const shajs = require('sha.js');
const MinifyUrl = require('../models/minifyUrl.model');

const createHashUrl = async (linkBody) => {
  const { originalUrl } = linkBody;
  const now = new Date();
  const hashData = `${originalUrl}${now.getMilliseconds()}`;
  const shortLinkHash = shajs('sha256')
    .update(hashData)
    .digest('base64')
    .match(/([a-zA-Z0-9]{7})/)[0];
  const minifyUrlObj = {
    hash: shortLinkHash,
    originalLink: originalUrl,
    creationTime: now.toISOString(),
    expirationTime: now.toISOString(),
  };

  return MinifyUrl.setShortenUrl(minifyUrlObj);
};

const getUrl = async (body) => {
  const { hash } = body;

  const data = await MinifyUrl.getUrl(hash);
  return data.Item;
};

const updateOriginalUrl = async (linkBody) => {
  const { hash, originalLink } = linkBody;
  return MinifyUrl.updateOriginalUrl(hash, originalLink);
};

const deleteUrl = async (linkBody) => {
  const { hash } = linkBody;
  return MinifyUrl.deleteUrl(hash);
};

module.exports = {
  createHashUrl,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
};
