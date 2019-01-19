"use strict";

const user = {
  routes: require("./userRoutes")
};
if (process.env.NODE_ENV === "test") user.testing = require("./userTesting");

module.exports = user;
