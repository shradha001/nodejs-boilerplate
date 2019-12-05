"use strict";

const logger = require("../libraries/logger");
const services = require("../services");
const utilities = require("../utilities");
const config = require("../config");

const {
  createSuccessObject,
  createErrorObject,
  getUUID,
  validatePassword
} = utilities.utils;
const { hashData } = utilities.hashUtil;
const { generateJWT } = utilities.jwtUtil;
const { respCodeAndMsg, constants } = config;
const { STATUS_CODE, ERROR_MESSAGES, SUCCESS_MESSAGES } = respCodeAndMsg;
const userService = services.users;

const registerUser = async payload => {
  try {
    //check if valid password
    const isPasswordValid = validatePassword(payload.password);
    if (!isPasswordValid) {
      let errMessage = respCodeAndMsg.ERROR_MESSAGES.PASSWORD_INVALID.replace(
        "{MIN}",
        constants.PASSWORD_CONSTRAINTS.min
      );
      throw createErrorObject(STATUS_CODE.BAD_REQUEST, errMessage);
    }

    //Check if a user already exists in the database with the same email
    const existingUser = await userService.getUserByEmail(payload.email);
    if (existingUser) {
      throw createErrorObject(
        STATUS_CODE.DUPLICATE_ENTRY,
        ERROR_MESSAGES.DUPLICATE_ENTRY,
        {}
      );
    }

    //hash the password
    const hashPassword = await hashData(payload.password);

    //create the user payload
    const newUser = {
      _id: getUUID(),
      email: payload.email,
      password: hashPassword
    };

    //generate the jwt token
    const jwtPayload = { email: newUser.email };
    const jwtToken = await generateJWT(jwtPayload);

    //save the user in the database
    await userService.saveUser(newUser);

    return createSuccessObject(
      STATUS_CODE.CREATED,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { token: jwtToken, expiry: constants.JWT.expiryInMins * 60 }
    );
  } catch (e) {
    logger.error(`Error in adding users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const loginUser = async payload => {
  try {
    const jwtPayload = { email: payload.email };
    const jwtToken = await generateJWT(jwtPayload);

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { token: jwtToken, expiry: constants.JWT.expiryInMins * 60 }
    );
  } catch (e) {
    logger.error(`Error in login users: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  registerUser,
  loginUser
};
