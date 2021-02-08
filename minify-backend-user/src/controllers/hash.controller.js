const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hashService } = require('../services');

const createUrl = catchAsync(async (req, res) => {
  const urlObject = await hashService.createHashUrl(req.body);
//   res.header('location', 'https://www.google.com');
  res.status(httpStatus.CREATED).send(urlObject);
});

const getUrls = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUrl = catchAsync(async (req, res) => {    
  res.header('location', 'https://www.google.com');
  res.status(httpStatus.MOVED_PERMANENTLY).send({});
});

const updateUrl = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUrl = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUrl,
  getUrls,
  getUrl,
  updateUrl,
  deleteUrl,
};
