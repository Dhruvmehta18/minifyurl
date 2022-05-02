const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ObjectId = mongoose.Types.ObjectId;

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
    max: 12,
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

const getSanitizedDataObj = (dataObj) => {
  const allowedKeys = ['minifyId', 'userId', 'clickYear', 'clickMonth'];
  const sanitizedDataObj = Object.keys(dataObj)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, currKey) => {
      return {
        ...obj,
        [currKey]: dataObj[currKey],
      };
    }, {});
  return sanitizedDataObj;
};

telemetrySchema.statics.getTelemetryDataForMonth = async function (dataObj) {
  const saniObj = getSanitizedDataObj(dataObj);
  let matchObj = {
    ...saniObj,
    userId: new ObjectId(saniObj.userId),
  };
  console.log(matchObj);
  const telemetryDetail = await this.aggregate([
    {
      $match: {
        ...matchObj,
      },
    },
    {
      $group: {
        _id: {
          $dayOfMonth: '$clickTime',
        },
        clickCount: {
          $count: {},
        },
        clickTime: {
          $first: {
            $dateToString: {
              format: '%d-%m-%Y',
              date: '$clickTime',
            },
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
  const telemetrySummary = await this.aggregate([
    {
      $match: {
        ...matchObj,
      },
    },
    {
      $count: 'id',
    },
  ]);
  const telemetryData = {
    performanceDetail: telemetryDetail,
    summary: telemetrySummary,
  };
  return telemetryData;
};

/**
 * @typedef Telemetry
 */
const Telemetry = mongoose.model('Telemetry', telemetrySchema);

module.exports = Telemetry;
