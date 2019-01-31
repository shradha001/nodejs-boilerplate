"use strict";
const mongoose = require("mongoose");
const logger = require("./log");
const { dbConfig } = require("./config");

const getConnection = () => {
  mongoose.connect(
    `mongodb://localhost/${dbConfig.database}`,
    { useNewUrlParser: true }
  );

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
