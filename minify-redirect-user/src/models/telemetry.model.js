const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const { SchemaTypes } = mongoose;
// noinspection JSValidateTypes
const telemetrySchema = mongoose.Schema({
  minifyId: {
    type: SchemaTypes.String,
    required: true,
    trim: true,
  },
  clickTime: {
    type: SchemaTypes.Date,
    trim: true,
    required: true,
  },
  clickMonth: {
    type: SchemaTypes.Number,
    required: true,
    max: 12,
    min: 1,
  },
  clickYear: {
    type: SchemaTypes.Number,
    required: true,
    max: 10e8,
    min: 2000,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  referer: {
    type: SchemaTypes.String,
    required: true,
  },
});

// add plugin that converts mongoose to json
telemetrySchema.plugin(toJSON);

/**
 * @typedef Telemetry
 */
const Telemetry = mongoose.model('Telemetry', telemetrySchema);

module.exports = Telemetry;
