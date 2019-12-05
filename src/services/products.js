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

const getProductById = async _id => {
  try {
    return await Product.findOne({ _id });
  } catch (e) {
    logger.error(`Error in fetching product by id: ${JSON.stringify(e)}`);
    throw e;
  }
};

const updateProduct = async (_id, payload) => {
  try {
    await Product.updateOne({ _id }, payload);
  } catch (e) {
    logger.error(`Error in updating products: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteProduct = async _id => {
  try {
    await Product.deleteOne({ _id });
  } catch (e) {
    logger.error(`Error in deleting a product: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  saveProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
