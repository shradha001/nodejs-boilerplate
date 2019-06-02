"use strict";

const user = {
  routes: require("./routes")
};
if (process.env.NODE_ENV === "test") user.testing = require("./testing");

module.exports = user;
