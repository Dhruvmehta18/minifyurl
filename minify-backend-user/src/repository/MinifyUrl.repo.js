const MinifyUrlDynamoModel = require('../models/minifyUrl.model');

const setShortenUrl = async (minifyUrlObject) => {
  await MinifyUrlDynamoModel.setShortenUrl(minifyUrlObject);
};

const queryUrls = async (userId, filter, options) => {
  const data = await MinifyUrlDynamoModel.queryUrls(userId, filter, options);
  return data.Items;
};

const getUrl = async (minifyId, userId) => {
  const data = await MinifyUrlDynamoModel.getUrl(minifyId, userId);
  return data.Item;
};

const updateOriginalUrl = async (minifyId, originalLink, userId) => {
  return await MinifyUrlDynamoModel.updateOriginalUrl(minifyId, originalLink, userId);
};

const deleteUrl = async () => {
  return await MinifyUrlDynamoModel.deleteUrl(minifyId, userId);
};

module.exports = {
  setShortenUrl,
  queryUrls,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
};
