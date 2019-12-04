"use strict";

require("dotenv").config();

const express = require("express");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const session = require("express-session");

const logger = require("./libraries/logger");
const routes = require("./routes");
const { errorHandler } = require("./middleware");
const { constants } = require("./config");
const swaggerDoc = require("./docs/swagger");

require("./libraries/passport")(passport);

if (process.env.NODE_ENV !== "test") require("./database").getConnection();

const app = express();

const apiLimiter = rateLimit({
  windowMs: constants.apiLimiter.duration,
  max: constants.apiLimiter.max,
  message: constants.apiLimiter.message
});

app.use(
  session({
    secret: constants.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
