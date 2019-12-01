"use strict";

const validUser1 = {
  email: "admin@test.com",
  password: "Alpha123"
};

const validUser2 = {
  email: "admin@gmail.com",
  password: "Alpha123"
};

const validUser3 = {
  _id: "123",
  email: "admin2@gmail.com",
  password: "dsf55353453"
};

const invalidEmail = {
  email: "admin",
  password: "Alpha123"
};

const invalidPassword = {
  email: "admin@gmail.com",
  password: "alpha123"
};

module.exports = {
  validUser1,
  validUser2,
  validUser3,
  invalidEmail,
  invalidPassword
};
