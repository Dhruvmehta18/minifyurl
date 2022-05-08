// file deepcode ignore XSS: the sanitization is done by mongoose package of node

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.body.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.OK).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.body.userId, req.body);
  res.status(httpStatus.NO_CONTENT).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.body.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const checkToken = catchAsync(async (req, res) => {
  const payload = {
    userId: req.user.id,
  };
  res.status(httpStatus.OK).send(payload);
});

const getMe = catchAsync(async (req, res) => {
  res.status(httpStatus.NO_CONTENT).send(req.user);
});

const updateMe = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.status(httpStatus.OK).send(user);
});

const deleteMe = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  checkToken,
  updateMe,
  getMe,
  deleteMe
};
