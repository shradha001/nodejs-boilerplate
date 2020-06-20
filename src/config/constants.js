"use strict";

const constants = {
  logger: {
    level: process.env.LOG_LEVEL || "info"
  },
  apiLimiter: {
    duration: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests, please try again after 15 minutes."
  },
  morganFormat: process.env.NODE_ENV === "development" ? "combined" : "dev",
  HASH_SALT_ROUNDS: process.env.HASH_SALT_ROUNDS
    ? process.env.HASH_SALT_ROUNDS
    : 10,
  JWT: {
    secret: process.env.JWT_SECRET
      ? process.env.JWT_SECRET
      : "do-not-save-it-here",
    expiryInMins: process.env.JWT_EXPIRY_IN_MINS
      ? process.env.JWT_EXPIRY_IN_MINS
      : 60
  },
  PASSWORD_CONSTRAINTS: {
    min: 6,
    max: 12
  },
  SESSION_SECRET: process.env.SESSION_SECRET
    ? process.env.SESSION_SECRET
    : "have-it-only-in-.env",
  DOCKER_MODE: process.env.DOCKER_MODE ? process.env.DOCKER_MODE : false
};

export default constants;
