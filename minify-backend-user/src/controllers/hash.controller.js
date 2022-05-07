const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService } = require('../services');

const createUrl = catchAsync(async (req, res) => {
  const urlObject = await hashService.createHashUrl(req.body, req.userId);
  if (urlObject === undefined || urlObject === null) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
  } else {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(httpStatus.CREATED).send(urlObject);
  }
});

const queryUrls = catchAsync(async (req, res) => {
  const filter = pick(req, ['userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await hashService.queryUrls(req.userId, filter, options);
  if (result === undefined || result === null) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
  } else {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(httpStatus.OK).send(result);
  }
});

const getUrl = catchAsync(async (req, res) => {
  const data = await hashService.getUrl(req.params.minify_id, req.userId);
    console.log(data);
  if (data === undefined || data === null) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
  } else {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(httpStatus.OK).send(data);
  }
});

const updateUrl = catchAsync(async (req, res) => {
  const updateUrlResponse = await hashService.updateUrl(req.body, req.userId);
  if (updateUrlResponse === undefined || updateUrlResponse === null) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
  } else {
    res.status(httpStatus.OK).send(updateUrlResponse);
  }
});

const deleteUrl = catchAsync(async (req, res) => {
  const data = await hashService.deleteUrl(req.params, req.userId);
  if (data === undefined || data === null) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
  } else {
    res.status(httpStatus.NO_CONTENT).send();
  }
});

module.exports = {
  createUrl,
  queryUrls,
  getUrl,
  updateUrl,
  deleteUrl,
};
