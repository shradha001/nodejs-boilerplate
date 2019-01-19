"use strict";
const logger = require("../log");

class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
}

module.exports = LoggerStream;
