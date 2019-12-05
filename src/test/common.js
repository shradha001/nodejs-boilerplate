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

const validUser4 = {
  email: "admin2@gmail.com",
  password: "Alpha123"
};

const validUser5 = {
  email: "user5@gmail.com",
  password: "Alpha123"
};

const invalidEmail = {
  email: "admin",
  password: "Alpha123"
};

const invalidPassword = {
  email: "admin@gmail.com",
  password: "alpha123"
};

const validProduct1 = {
  productName: "Leaf Rake",
  productCode: "GDN-0011",
  description: "Leaf rake with 48-inch wooden handle.",
  price: 19.95
};

const validProduct2 = {
  productName: "Leaf Rake 2",
  productCode: "GDN-0011",
  description: "Leaf rake with 48-inch wooden handle.",
  price: 19
};

const updateProductDetails = {
  productName: "product 3",
  productCode: "GDN-0011",
  description: "Leaf rake with 48-inch wooden handle.",
  price: 19
};

const dataToHash = "testuser@gmail.com";

const jwtPayload = { email: "test@gmail.com" };

module.exports = {
  validUser1,
  validUser2,
  validUser3,
  invalidEmail,
  invalidPassword,
  validProduct1,
  validUser4,
  dataToHash,
  jwtPayload,
  validUser5,
  validProduct2,
  updateProductDetails
};
