'use strict';
const mongoose = require('mongoose');
const { dbConfig } = require('./config');

const getConnection = () => {
  mongoose.connect(
    `mongodb://localhost/${dbConfig.database}`,
    { useNewUrlParser: true }
  );

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbConfig.database}`);
  });
  mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};

module.exports = { getConnection };
