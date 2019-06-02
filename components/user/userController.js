"use strict";
const userService = require("./userService");
const {
  isEmptyObject,
  createSuccessObject,
  createErrorObject,
  getUUID
} = require("../../utilities");
const { respCodeAndMsg } = require("../../config");
const { STATUS_CODE, ERROR_MESSAGES, SUCCESS_MESSAGES } = respCodeAndMsg;

const getUser = async payload => {
  try {
    const user = await userService.getUserById(payload._id);
    if (!isEmptyObject(user)) {
      return createSuccessObject(
        STATUS_CODE.OK,
        SUCCESS_MESSAGES.ACTION_COMPLETE,
        user
      );
    }
    throw createErrorObject(
      STATUS_CODE.NOT_FOUND,
      ERROR_MESSAGES.DATA_NOT_FOUND
    );
  } catch (e) {
    throw e;
  }
};

const addUser = async payload => {
  try {
    const _id = getUUID();
    payload._id = _id;
    await userService.addUser(payload);
    return createSuccessObject(
      STATUS_CODE.CREATED,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { _id }
    );
  } catch (e) {
    throw e;
  }
};

const updateUser = async payload => {
  try {
    const user = await userService.getUserById(payload._id);
    if (!user || isEmptyObject(user)) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND
      );
    }
    Object.assign(user, payload);
    await userService.updateUser(user);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    throw e;
  }
};

const deleteUser = async payload => {
  try {
    const user = await userService.getUserById(payload._id);
    if (!user || isEmptyObject(user)) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND
      );
    }
    await userService.deleteUser(user._id);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
};
