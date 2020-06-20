"use strict";

import mongoose from "mongoose";
import logger from "../libraries/logger";
import { dbConfig } from "../config";

const getConnection = () => {
  mongoose.connect(`${dbConfig.url}/${dbConfig.database}`, {
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

export { getConnection };
