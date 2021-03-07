const RedirectUrl = require('../models/redirectUrl.model');

const getOriginalUrl = async (minifyId) => {
  const data = await RedirectUrl.getOriginalUrl(minifyId);
  return data.Item;
};

module.exports = {
  getOriginalUrl,
};
