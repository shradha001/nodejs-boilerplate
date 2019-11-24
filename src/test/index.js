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
      .then(() => {
        console.log(`MongoDB: Connected to ${DATABASE_NAME} database.`);
      });
  });
  importTests("Users", "../components/users/test");
  after(function() {
    mongoose.connection.close();
  });
};

runTests();
