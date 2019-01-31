const winston = require("winston");
const { constants } = require("../config");

const logger = winston.createLogger({
  level: constants.logger.level,
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // - new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // - new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV === "test") {
  logger.silent = true;
} else if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      timestamp: function() {
        return Date.now();
      },
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.align(),
        winston.format.printf(info => {
          const { timestamp, level, message, ...args } = info;
          const ts = timestamp.slice(0, 19).replace("T", " ");
          return `${ts} [${level}]: ${message} ${
            Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
          }`;
        })
      )
    })
  );
}

module.exports = logger;
