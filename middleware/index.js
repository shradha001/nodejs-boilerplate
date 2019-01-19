"use strict";

const { isCelebrate } = require("celebrate");
const logger = require("../log");

function errorHandler(err, req, res, next) {
  if (err) {
    if (isCelebrate(err)) {
      const readableMessage = err.details
        .map(d => d.message.replace(/["]/gi, ""))
        .join(", ");
      const e = { message: readableMessage, data: {} };
      res.status(400).json(e);
    } else {
      res.status(400).json({ message: "Bad Request", data: {} });
    }
  } else next();
}

class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
}

module.exports = {
  errorHandler,
  LoggerStream
};
