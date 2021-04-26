const logger = require('../config/logger');
const MinifyUrlRepository = require('../repository/MinifyUrl.repo');
const randomIdGenerator = require('../utils/randomIdGenerator')

const createHashUrl = async (linkBody ,userId) => {
  linkBody = {
    ...linkBody,
    userId: userId
  }
  const minifyObject = randomIdGenerator(linkBody);
  await MinifyUrlRepository.setShortenUrl(minifyObject);
  return minifyUrlObj;
};

const queryUrls = async (userId, filter, options) => {
  const items = await MinifyUrlRepository.queryUrls(userId, filter, options);
  return items;
};

const getUrl = async (minifyId = "", userId) => {
  const data = await MinifyUrlRepository.getUrl(minifyId, userId);
  return data.Item;
};

const updateOriginalUrl = async (linkParams, linkBody, userId) => {
  const {minify_id: minifyId} = linkParams;
  const { original_url: originalLink } = linkBody;
  
  return (await MinifyUrlRepository.updateOriginalUrl(minifyId, originalLink, userId));
};

const deleteUrl = async (linkParams, userId) => {
  const { minify_id: minifyId } = linkParams;
  return (await MinifyUrlRepository.deleteUrl(minifyId, userId));
};

module.exports = {
  createHashUrl,
  getUrl,
  queryUrls,
  updateOriginalUrl,
  deleteUrl,
};
