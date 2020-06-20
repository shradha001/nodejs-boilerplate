"use strict";

import jwt from "jsonwebtoken";
import Promise from "bluebird";

import logger from "../libraries/logger";
import { constants } from "../config";

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

export { generateJWT };
