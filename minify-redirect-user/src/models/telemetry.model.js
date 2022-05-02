const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

// noinspection JSValidateTypes
const telemetrySchema = mongoose.Schema({
  minifyId: {
    type: String,
    required: true,
    trim: true,
  },
  clickTime: {
    type: Date,
    trim: true,
    required: true,
  },
  clickMonth: {
    type: Number,
    required: true,
    max: 12,
    min: 1,
  },
  clickYear: {
    type: Number,
    required: true,
    max: 10e8,
    min: 2000,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
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
