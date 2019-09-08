"use strict";

module.exports = {
  STATUS_CODE: {
    OK: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401
  },
  ERROR_MESSAGES: {
    SOMETHING_WRONG: "Something went wrong.",
    INVALID_REQUEST: "Invalid Request.",
    DATA_NOT_FOUND: "Data not found.",
    INVALID_DATA: "Invalid Data.",
    WRONG_PARAMETER: "Wrong parameter.",
    DUPLICATE_ENTRY: "Duplicate Entry.",
    ACCESS_DENIED: "Access Denied."
  },
  SUCCESS_MESSAGES: {
    ACTION_COMPLETE: "Action complete."
  }
};
