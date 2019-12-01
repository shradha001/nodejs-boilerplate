"use strict";

const models = require("../models");
const logger = require("../libraries/logger");

const User = models.user;

const saveUser = async payload => {
  try {
    const user = new User();
    Object.assign(user, payload);
    await user.save();
  } catch (e) {
    logger.error(`Service: Error in adding users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const getUserByEmail = async email => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    logger.error(`Error in fetching user: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  saveUser,
  getUserByEmail
};
