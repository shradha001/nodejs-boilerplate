"use strict";

process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "error";
process.env.DB_NAME = "testdb";

const mongoose = require("mongoose");
const server = require("../bin/www");

require("../components/home").testing(server);
require("../components/user").testing(server);

after(async () => {
  await mongoose.connection.db.dropDatabase();
});
