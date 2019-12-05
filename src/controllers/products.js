"use strict";

const services = require("../services");
const utilities = require("../utilities");
const config = require("../config");
const logger = require("../libraries/logger");

const { respCodeAndMsg } = config;
const { STATUS_CODE, SUCCESS_MESSAGES, ERROR_MESSAGES } = respCodeAndMsg;
const { createSuccessObject, getUUID, createErrorObject } = utilities.utils;
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

const getProduct = async (payload, user) => {
  try {
    const product = await productServices.getProductById(payload._id);

    if (!product) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    //do user has the right role. Only the user who created the product can read it.
    if (product.user && product.user !== user.email) {
      logger.warn("User doesn't have the right role to read product.");
      throw createErrorObject(
        STATUS_CODE.UNAUTHORIZED,
        ERROR_MESSAGES.NOT_RIGHT_ROLE,
        {}
      );
    }

    const filteredProduct = filterProduct(product);

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      filteredProduct
    );
  } catch (e) {
    logger.error(
      `Product controller: Error in fetching products: ${JSON.stringify(e)}`
    );
    throw e;
  }
};

const filterProduct = product => {
  product.__v = undefined;
  product.user = undefined;
  return product;
};

module.exports = {
  addProduct,
  getProduct
};
