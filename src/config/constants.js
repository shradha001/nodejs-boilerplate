"use strict";

module.exports = {
  logger: {
    level: process.env.LOG_LEVEL || "info"
  },
  apiLimiter: {
    duration: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests, please try again after 15 minutes."
  },
  morganFormat: process.env.NODE_ENV === "development" ? "combined" : "dev"
};
