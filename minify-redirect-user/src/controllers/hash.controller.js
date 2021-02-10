const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService } = require('../services');

const getUrl = catchAsync(async (req, res) => {
  const data = await hashService.getOriginalUrl(req.params.minify_id);
  if(!data){
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something happen on our side');
  }
  console.log(data.originalLink);
  res.header('location', `${data.originalLink}`);
  res.status(httpStatus.MOVED_PERMANENTLY).send({});
});

module.exports = {
  getUrl
};
