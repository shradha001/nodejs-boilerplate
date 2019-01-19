"use strict";
const dotenv = require("dotenv");
dotenv.load();
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const { errorHandler } = require("./middleware");
const { constants } = require("./config");

require("./database").getConnection();

const app = express();

const apiLimiter = rateLimit({
  windowMs: constants.apiLimiter.duration,
  max: constants.apiLimiter.max,
  message: constants.apiLimiter.message
});

app.use(apiLimiter);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
routes(app);
app.use(errorHandler);

module.exports = app;
