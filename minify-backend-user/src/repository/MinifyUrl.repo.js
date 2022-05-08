const httpStatus = require('http-status');
const MinifyUrlDynamoModel = require('../models/minifyUrlDynamo.model');
const Link = require('../models/minifyLink.model');
const ApiError = require('../utils/ApiError');

const setShortenUrl = async (minifyUrlObject) => {
  const link = await Link.create(minifyUrlObject);
  await MinifyUrlDynamoModel.setShortenUrl(minifyUrlObject);
  return link;
};

const queryUrls = async (filter, options) => {
  // noinspection JSUnresolvedFunction paginate is not able to regonize as function but it is there
  return Link.paginate(filter, options);
};

const getUrl = async (minifyId, userId) => {
  // noinspection JSUnresolvedFunction getLink is not able to regonize as function but it is there
  return Link.getLink(minifyId, userId);
};

const updateOriginalUrl = async (linkObject, updateBody) => {
  Object.assign(linkObject, updateBody);
  await linkObject.save();
  // https://github.com/nodesecurity/eslint-plugin-security/issues/26 some false positive in eslint
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await MinifyUrlDynamoModel.updateOriginalUrl(linkObject.minifyId, linkObject.link);
  return linkObject;
};

const deleteUrl = async (minifyId, userId) => {
  const link = await Link.findOne({ minifyId });
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
  }
  await link.remove();
  await MinifyUrlDynamoModel.deleteUrl(minifyId, userId);
  return link;
};

const isMinifyIdTaken = async (minifyId = '') => {
  // noinspection JSUnresolvedFunction isMinifyIdTaken is not able to regonize as function but it is there
  return Link.isMinifyIdTaken(minifyId);
};

module.exports = {
  setShortenUrl,
  queryUrls,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
  isMinifyIdTaken,
};
