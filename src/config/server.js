"use strict";

module.exports = {
  PORT: process.env.PORT || 9596,
  SERVER_URL: process.env.SERVER_URL
    ? process.env.SERVER_URL
    : "http://localhost:9596"
};
