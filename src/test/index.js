"use strict";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "thisisasecret";
process.env.SESSION_SECRET = "thisissessionsecret";

require("dotenv").config();

const mongoose = require("mongoose");

const DATABASE_NAME = "demo-test";

const importTests = (name, path) => {
  require(path);
};

const runTests = () => {
  before(function() {
    return mongoose
      .connect(`mongodb://localhost/${DATABASE_NAME}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
      .then(async () => {
        console.log(`MongoDB: Connected to ${DATABASE_NAME} database.`);
      });
  });

  importTests("Users", "./users");
  importTests("Products", "./products");
  importTests("Services", "./services");
  importTests("Utilities", "./utilities");
  after(function() {
    mongoose.connection.close();
  });
};

runTests();
