"use strict";

const { isCelebrate } = require("celebrate");

const errorHandler = (err, req, res, next) => {
  if (err) {
    let foundErr = false;
    if (isCelebrate(err)) {
      if (err.joi) {
        let errDetails = err.joi.details;
        const readableMessage = errDetails
          .map(d => d.message.replace(/["]/gi, ""))
          .join(", ");
        const e = { message: readableMessage, data: {} };
        foundErr = true;
        res.status(400).json(e);
      }
    }
    if (!foundErr) {
      res.status(400).json({ message: "Bad Request", data: {} });
    }
  } else {
    next();
  }
};

module.exports = errorHandler;
