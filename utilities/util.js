'use strict';

const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const { respCodeAndMsg } = require('../config');
const { STATUS_CODE } = respCodeAndMsg;

const createErrorObject = (httpStatusCode, message) => {
  return {
    details: {
      message: message || 'internal error',
      data: {}
    },
    httpStatusCode: httpStatusCode || STATUS_CODE.BAD_REQUEST
  };
};

const createSuccessObject = (httpStatusCode, message, data) => {
  return {
    details: {
      message: message || 'success',
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
