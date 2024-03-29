const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService, telemetryService } = require('../services');

const getUrl = catchAsync(async (req, res) => {
  const item = await hashService.getOriginalUrl(req.params.minify_id);
  if (item === undefined || item === null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Given link not found');
  } else {
    await telemetryService.addTelemetry(req.params.minify_id, item.userId, req.headers.referer);
    res.set('Cache-Control', `private, max-age=90`);
    res.set('location', `${item.originalLink}`);
    res.set('Referrer-Policy', 'unsafe-url');
    res.set('Content-Security-Policy', 'referrer always;');
    res.status(httpStatus.MOVED_PERMANENTLY).render('index', { originalLink: item.originalLink });
  }
});

module.exports = {
  getUrl,
};
