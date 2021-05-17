const shajs = require('sha.js');
const { addMonths } = require('./dateUtils');

const minifyObjectGenerator = (linkBody) => {
  const { original_url: originalUrl, userId } = linkBody;
  const now = new Date();
  const expirationDate = addMonths(now, 6);
  const hashData = `${originalUrl}${now.getMilliseconds()}`;
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
  };
};

module.exports = minifyObjectGenerator;
