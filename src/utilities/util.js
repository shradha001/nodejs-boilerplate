"use strict";

const _ = require("lodash");
const uuidv4 = require("uuid/v4");
const { respCodeAndMsg } = require("../config");
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

module.exports = {
  createErrorObject,
  isEmptyObject,
  createSuccessObject,
  getUUID
};
