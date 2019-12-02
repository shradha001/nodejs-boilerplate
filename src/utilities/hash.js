"use strict";

const bcrypt = require("bcrypt");

const logger = require("../libraries/logger");
const { constants } = require("../config");

const hashData = async data => {
  try {
    return await bcrypt.hash(data, constants.HASH_SALT_ROUNDS);
  } catch (e) {
    logger.error(`Error in hashing password `, JSON.stringify(e));
    throw e;
  }
};

module.exports = {
  hashData
};
