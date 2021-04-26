const shajs = require('sha.js');
const { addMonths } = require('./dateUtils');

const randomIdGenerator = (linkBody) => {
    const { original_url: originalUrl,userId: userId} = linkBody;
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
    }
    return minifyUrlObj;
}

module.exports = randomIdGenerator;