"use strict";

const { isCelebrate } = require("celebrate");

function errorHandler(err, req, res, next) {
  if (err) {
    if (isCelebrate(err)) {
      const readableMessage = err.details
        .map(d => d.message.replace(/["]/gi, ""))
        .join(", ");
      const e = { message: readableMessage, data: {} };
      res.status(400).json(e);
    } else {
      res.status(400).json({ message: "Bad Request", data: {} });
    }
  } else next();
}

module.exports = {
  errorHandler
};
