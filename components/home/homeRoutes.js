"use strict";

const config = require("../../config");
const { respCodeAndMsg } = config;
const { STATUS_CODE } = respCodeAndMsg;

module.exports = app => {
  app.get("/", (req, res) => {
    res.status(STATUS_CODE.OK).json({ message: "OK" });
  });
};
