const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService } = require('../services');

const getUrl = catchAsync(async (req, res) => {
    const item = await hashService.getOriginalUrl(req.params.minify_id);
    if (item === undefined || item === null) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Given link not found');
    } else {
      res.set('Cache-Control', `private, max-age=90`);
      res.set('location', `${item.originalLink}`);
      res.status(httpStatus.MOVED_PERMANENTLY).render('index', { originalLink: item.originalLink });
    }
});

module.exports = {
  getUrl
};
