var shajs = require('sha.js');

const createHashUrl = async (linkBody) => {
    const original_url = linkBody.original_url;
    const hashData = `${original_url}${new Date().getMilliseconds()}`
    const shortLink = shajs('sha256').update(hashData).digest('base64').match(/([a-zA-Z0-9]{7})/)[0];
    const hashUrlObj = {
        shortLink: shortLink
    }
    return hashUrlObj;
}

module.exports =  {
    createHashUrl
}