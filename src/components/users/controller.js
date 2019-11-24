"use strict";
const logger = require("../../libraries/logger");
const userService = require("./service");
const {
  createSuccessObject,
  createErrorObject,
  getUUID,
  isEmptyObject
} = require("../../utilities");
const { respCodeAndMsg } = require("../../config");

const { STATUS_CODE, ERROR_MESSAGES, SUCCESS_MESSAGES } = respCodeAndMsg;

const filterUser = users => {
  return users.map(user => {
    return {
      _id: user._id,
      name: user.name
    };
  });
};

const getUser = async payload => {
  try {
    let usersList = [];
    let searchQuery = payload && payload._id ? { _id: payload._id } : {};
    const users = await userService.getUsers(searchQuery);
    if (users && Array.isArray(users)) {
      if (!isEmptyObject(searchQuery) && users.length === 0) {
        throw createErrorObject(
          STATUS_CODE.NOT_FOUND,
          ERROR_MESSAGES.DATA_NOT_FOUND
        );
      }
      usersList = filterUser(users);
    }
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      usersList
    );
  } catch (e) {
    logger.error(`Controller: Error in fetching users: ${JSON.stringify(e)}`);
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
    logger.error(`Controller: Error in adding users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const updateUser = async payload => {
  try {
    const users = await userService.getUsers({ _id: payload._id });
    if (!users || !Array.isArray(users) || users.length === 0) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND
      );
    }
    const user = users[0];
    Object.assign(user, payload);
    await userService.updateUser(user);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Controller: Error in updating users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteUser = async payload => {
  try {
    const users = await userService.getUsers({ _id: payload._id });
    if (!users || !Array.isArray(users) || users.length === 0) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND
      );
    }
    const user = users[0];
    await userService.deleteUser(user._id);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Controller: Error in deleting users: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
};
