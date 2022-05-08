const Telemetry = require('../models/telemetry.model');

const getTelemetryForMonth = async (userId, options) => {
  const telemetryObject = {
    userId,
    ...options
  }
  const telemetryData = await Telemetry.getTelemetryDataForMonth(telemetryObject);
  return telemetryData;
};

module.exports = {
  getTelemetryForMonth,
};
