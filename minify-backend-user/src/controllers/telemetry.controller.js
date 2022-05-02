const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const TelemetryService = require('../services/telemetry.service');

const getTelemetryDataOfMonth = catchAsync(async (req, res) => {
  const options = pick(req.query, ['minifyId', 'clickMonth', 'clickYear']);
  const telemetryData = await TelemetryService.getTelemetryForMonth(req.userId, options);
  res.setHeader('Cache-Control', `private, max-age=90`);
  res.status(httpStatus.OK).send(telemetryData);
});

module.exports = {
    getTelemetryDataOfMonth
}
