const Telemetry = require('../models/telemetry.model');

const addTelemetry = async (minifyId, userId, referer) => {
  const date = new Date(new Date().toUTCString());
  const telemetryObject = {
    minifyId,
    clickTime: date.toISOString(),
    clickMonth: date.getMonth() + 1,
    clickYear: date.getFullYear(),
    userId,
    ...(referer ? { referer } : { referer: 'Direct or other' }),
  };
  const telemetryData = await Telemetry.create(telemetryObject);
  return telemetryData;
};

module.exports = {
  addTelemetry,
};
