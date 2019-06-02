"use strict";

const home = {
  routes: require("./routes")
};
if (process.env.NODE_ENV === "test") home.testing = require("./testing");

module.exports = home;
