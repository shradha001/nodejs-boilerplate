"use strict";

process.env.NODE_ENV = "test";

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
  importTests("Services", "./services");
  importTests("Users", "./users");
  after(function() {
    mongoose.connection.close();
  });
};

runTests();
