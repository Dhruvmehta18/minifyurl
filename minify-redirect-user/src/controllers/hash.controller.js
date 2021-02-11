const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService } = require('../services');

const getUrl = catchAsync(async (req, res) => {
  const item = await hashService.getOriginalUrl(req.params.minify_id);
  
  if (item === undefined || item === null) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
  }
  res.header('location', `${item.originalLink}`);
  res.status(httpStatus.MOVED_PERMANENTLY).send({});
});

module.exports = {
  getUrl
};
