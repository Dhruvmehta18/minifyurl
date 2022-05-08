const shajs = require('sha.js');
const { addMonths } = require('./dateUtils');
const crypto = require('crypto');

const minifyObjectGenerator = (linkBody) => {
  const { original_url: originalUrl, userId, title } = linkBody;
  const now = new Date(new Date().toUTCString());
  const expirationDate = addMonths(now, 6);
  const hashData = `${now.toUTCString()}${crypto.randomBytes(8).toString()}${originalUrl}`;
  const shortLinkHash = shajs('sha256')
    .update(hashData)
    .digest('base64')
    .match(/([a-zA-Z0-9]{7})/)[0];
  return {
    minifyId: shortLinkHash,
    originalLink: originalUrl,
    creationTime: now.toISOString(),
    expirationTime: expirationDate.toISOString(),
    userId,
    title,
  };
};

module.exports = minifyObjectGenerator;
