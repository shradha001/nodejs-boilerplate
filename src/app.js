"use strict";
require("dotenv").config();

const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const logger = require("./libraries/logger");
const routes = require("./routes");
const { errorHandler } = require("./middleware");
const { constants } = require("./config");

if (process.env.NODE_ENV !== "test") require("./database").getConnection();

const swaggerDoc = require("./docs/swagger");
const app = express();

const apiLimiter = rateLimit({
  windowMs: constants.apiLimiter.duration,
  max: constants.apiLimiter.max,
  message: constants.apiLimiter.message
});

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.static(path.join(__dirname, "/public")));
app.use(apiLimiter);
app.use(helmet());
app.use(morgan(constants.morganFormat, { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routes(app);

app.use(errorHandler);

module.exports = app;
