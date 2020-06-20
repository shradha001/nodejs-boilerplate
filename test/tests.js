"use strict";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "thisisasecret";
process.env.SESSION_SECRET = "thisissessionsecret";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

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
  importTests("Utilities", "./utilities");
  after(function() {
    mongoose.connection.close();
  });
};

runTests();
