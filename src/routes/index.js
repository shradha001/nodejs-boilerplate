"use strict";

module.exports = app => {
  require("../components/users").routes(app);
};
