"use strict";

import winston from "winston";
import root from "app-root-path";

import { constants } from "../../config";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;
const logLevel = constants.logger.level;
const errorFile = `${root.path}/logs/error.log`;

const logFormat = printf(detail => {
  return `${detail.timestamp} ${detail.level}: ${detail.message}`;
});

const logger = createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    format.colorize({ colors: { info: "green", error: "red", debug: "blue" } }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: errorFile, level: "error" })
  ]
});

logger.stream = {
  write: function(message) {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
};

if (process.env.NODE_ENV == "test") {
  logger.remove(logger.transports.Console);
}

export default logger;
