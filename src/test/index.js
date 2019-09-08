"use strict";

process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const DATABASE_NAME = "demo-test";

const importTests = (name, path) => {
  describe(name, function() {
    require(path);
  });
};

const runTests = () => {
  before(function() {
    return mongoose
      .connect(`mongodb://localhost/${DATABASE_NAME}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      .then(() => {
        console.log(`MongoDB: Connected to ${DATABASE_NAME} database.`);
      });
  });

  describe("API test cases", function(done) {
    importTests("Users", "../components/users/test");
    after(function(done) {
      return mongoose.disconnect(done);
    });
  });
};

runTests();
