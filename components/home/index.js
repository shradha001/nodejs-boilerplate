"use strict";

const home = {
  routes: require("./homeRoutes")
};
if (process.env.NODE_ENV === "test") home.testing = require("./homeTesting");

module.exports = home;
