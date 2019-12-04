"use strict";

module.exports = app => {
  require("./users")(app);
  require("./products")(app);
};
