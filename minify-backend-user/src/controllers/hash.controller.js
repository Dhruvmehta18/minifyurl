const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService } = require('../services');

const createUrl = catchAsync(async (req, res) => {
  const urlObject = await hashService.createHashUrl(req.body);
  if (urlObject === undefined || urlObject === null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Given link not found');
  } else {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(httpStatus.CREATED).send(urlObject);
  }
});

const getUrls = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await hashService.queryUsers(filter, options);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(httpStatus.OK).send(result);
});

const getUrl = catchAsync(async (req, res) => {
  // TODO : add the code for getting url by id
  res.header('location', 'https://www.google.com');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(httpStatus.OK).send({});
});

const updateUrl = catchAsync(async (req, res) => {
  const user = await hashService.updateOriginalUrl(req.body);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(httpStatus.NO_CONTENT).send(user);
});

const deleteUrl = catchAsync(async (req, res) => {
  await hashService.deleteUrl(req.params.userId);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUrl,
  getUrls,
  getUrl,
  updateUrl,
  deleteUrl,
};
