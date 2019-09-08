const path = require("path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const { constants } = require("../../config");
const logLevel = constants.logger.level;

const errorFile = path.join(__dirname, "/../../../logs/error.log");

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

module.exports = logger;
