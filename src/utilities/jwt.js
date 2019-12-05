"use strict";

const jwt = require("jsonwebtoken");
const Promise = require("bluebird");

const logger = require("../libraries/logger");
const { constants } = require("../config");
const { JWT } = constants;

Promise.promisifyAll(jwt);

const generateJWT = async payload => {
  try {
    const options = {
      expiresIn: JWT.expiryInMins * 60
    };
    return await jwt.signAsync(payload, JWT.secret, options);
  } catch (e) {
    logger.error(`Error in creating jwt token ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  generateJWT
};
