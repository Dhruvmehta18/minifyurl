const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ObjectId = mongoose.Types.ObjectId;

const SchemaTypes = mongoose.SchemaTypes;
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

const getPerformanceData = async (thisObj, matchObj) => {
  return await thisObj.aggregate([
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
};

const getTotalClicksSummary = async (thisObj, matchObj) => {
  const data = await thisObj.aggregate([
    {
      $match: {
        ...matchObj,
      },
    },
    {
      $count: 'id',
    },
    {
      $project: {
        totalClick: '$id',
      },
    },
  ]);
  return data && data.length > 0 ? data[0] : { totalClick: 0 };
};

const getTotalRefererSummary = async (thisObj, matchObj) => {
  const data = await thisObj.aggregate([
    {
      $match: {
        ...matchObj,
      },
    },
    {
      $group: {
        _id: '$referer',
      },
    },
    {
      $count: 'id',
    },
    {
      $project: {
        totalReferer: '$id',
      },
    },
  ]);
  return data && data.length > 0 ? data[0] : { totalReferer: 0 };
};

const getTotalRefererSplitUp = async (thisObj, matchObj, nums) => {
  if (nums === 0) {
    return [];
  }
  return await thisObj.aggregate([
    {
      $match: {
        ...matchObj,
      },
    },
    {
      $group: {
        _id: '$referer',
        refererCountByClicks: {
          $count: {},
        },
      },
    },
    {
      $project: {
        count: 1,
        percentage: {
          $round: [{ $multiply: [{ $divide: ['$refererCountByClicks', { $literal: nums }] }, 100] }, 2],
        },
      },
    },
  ]);
};

telemetrySchema.statics.getTelemetryDataForMonth = async function (dataObj) {
  const saniObj = getSanitizedDataObj(dataObj);
  let matchObj = {
    ...saniObj,
    userId: new ObjectId(saniObj.userId),
  };
  const performanceDetailPromise = getPerformanceData(this, matchObj);
  const telemetrySummaryTotalClickPromise = getTotalClicksSummary(this, matchObj);
  const telemetrySummaryTotalRefererPromise = getTotalRefererSummary(this, matchObj);
  const [performanceDetail, telemetrySummaryTotalClick, telemetrySummaryTotalReferer] = await Promise.all([
    performanceDetailPromise,
    telemetrySummaryTotalClickPromise,
    telemetrySummaryTotalRefererPromise,
  ]);
  let telemetryRefererSplitUp;
  if (saniObj.minifyId) {
    telemetryRefererSplitUp = await getTotalRefererSplitUp(this, matchObj, telemetrySummaryTotalClick.totalClick);
  }
  const telemetryData = {
    performanceDetail: performanceDetail,
    summary: {
      ...telemetrySummaryTotalClick,
      ...telemetrySummaryTotalReferer,
    },
    ...(telemetryRefererSplitUp && { telemetryRefererSplitUp }),
  };
  return telemetryData;
};

/**
 * @typedef Telemetry
 */
const Telemetry = mongoose.model('Telemetry', telemetrySchema);

module.exports = Telemetry;
