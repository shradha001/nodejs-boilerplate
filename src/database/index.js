"use strict";
const mongoose = require("mongoose");
const logger = require("../libraries/logger");
const { dbConfig } = require("../config");

const getConnection = () => {
  mongoose.connect(`mongodb://localhost/${dbConfig.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    logger.info(`Mongoose connected to ${dbConfig.database}`);
  });
  mongoose.connection.on("error", err => {
    logger.error(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose disconnected");
  });
};

module.exports = { getConnection };
