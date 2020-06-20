"use strict";

import _ from "lodash";
import uuidv4 from "uuid/v4";
import passwordValidator from "password-validator";

import { respCodeAndMsg, constants } from "../config";

const { STATUS_CODE } = respCodeAndMsg;

const createErrorObject = (httpStatusCode, message, data) => {
  return {
    details: {
      message: message || respCodeAndMsg.ERROR_MESSAGES.SOMETHING_WRONG,
      data: data || {}
    },
    httpStatusCode: httpStatusCode || STATUS_CODE.BAD_REQUEST
  };
};

const createSuccessObject = (httpStatusCode, message, data) => {
  return {
    details: {
      message: message || respCodeAndMsg.SUCCESS_MESSAGES.ACTION_COMPLETE,
      data: data || {}
    },
    httpStatusCode: httpStatusCode || STATUS_CODE.OK
  };
};

const getUUID = () => {
  return uuidv4();
};

const isEmptyObject = obj => {
  return _.isEmpty(obj);
};

const validatePassword = password => {
  const passwordSchema = new passwordValidator();
  const { PASSWORD_CONSTRAINTS } = constants;
  passwordSchema
    .is()
    .min(PASSWORD_CONSTRAINTS.min) // Minimum length
    .is()
    .max(PASSWORD_CONSTRAINTS.max) // Maximum length
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces();
  return passwordSchema.validate(password);
};

export {
  createErrorObject,
  isEmptyObject,
  createSuccessObject,
  getUUID,
  validatePassword
};
