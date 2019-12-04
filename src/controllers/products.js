"use strict";

const services = require("../services");
const utilities = require("../utilities");
const config = require("../config");
const logger = require("../libraries/logger");

const { respCodeAndMsg } = config;
const { STATUS_CODE, SUCCESS_MESSAGES } = respCodeAndMsg;
const { createSuccessObject, getUUID } = utilities.utils;
const productServices = services.products;

const addProduct = async (payload, user) => {
  try {
    const _id = getUUID();
    const result = { ...payload };
    result.user = user.email;
    result._id = _id;
    await productServices.saveProduct(result);
    return createSuccessObject(
      STATUS_CODE.CREATED,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { _id }
    );
  } catch (e) {
    logger.error(`Error in adding products: ${e}`);
    throw e;
  }
};

module.exports = {
  addProduct
};
