"use strict";

const models = require("../models");
const logger = require("../libraries/logger");

const Product = models.product;

const saveProduct = async payload => {
  try {
    const product = new Product();
    Object.assign(product, payload);
    await product.save();
  } catch (e) {
    logger.error(`Service: Error in adding products: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  saveProduct
};
