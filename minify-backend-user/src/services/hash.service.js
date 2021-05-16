const httpStatus = require('http-status');
const MinifyUrlRepository = require('../repository/MinifyUrl.repo');
const minifyObjectGenerator = require('../utils/randomIdGenerator');
const ApiError = require('../utils/ApiError');

const createHashUrl = async (linkBody, userId) => {
  if (await MinifyUrlRepository.isMinifyIdTaken(linkBody.minifyId)) {
    throw new ApiError(httpStatus.CONFLICT, httpStatus['409_MESSAGE']);
  }
  const minifyObject = minifyObjectGenerator({
    ...linkBody,
    userId,
  });
  return MinifyUrlRepository.setShortenUrl(minifyObject);
};

const queryUrls = async (userId, filter, options) => {
  return MinifyUrlRepository.queryUrls(userId, filter, options);
};

const getUrl = async (minifyId = '', userId) => {
  return MinifyUrlRepository.getUrl(minifyId, userId);
};

const updateUrl = async (linkParams, linkBody, userId) => {
  const { minify_id: minifyId } = linkParams;

  const link = await MinifyUrlRepository.getUrl(minifyId, userId);
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'link not found');
  }

  return MinifyUrlRepository.updateOriginalUrl(link, linkBody);
};

const deleteUrl = async (linkParams, userId) => {
  const { minify_id: minifyId } = linkParams;
  return MinifyUrlRepository.deleteUrl(minifyId, userId);
};

module.exports = {
  createHashUrl,
  getUrl,
  queryUrls,
  updateUrl,
  deleteUrl,
};
