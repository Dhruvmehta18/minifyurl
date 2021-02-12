const httpStatus = require('http-status');
const RedirectUrl = require('../models/redirectUrl.model');
const ApiError = require('../utils/ApiError');

const getOriginalUrl = async (minify_id) => {
    const data = await RedirectUrl.getOriginalUrl(minify_id);
    return data.Item;
};

module.exports = {
    getOriginalUrl
};
