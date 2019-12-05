"use strict";

const chai = require("chai");
const request = require("supertest");

const models = require("../models");
const app = require("../app");
const common = require("./common");

const expect = chai.expect;
const Product = models.product;
const User = models.user;

describe("Products", function() {
  describe("POST /products", function() {
    beforeEach(async function() {
      await Product.deleteMany();
      await User.deleteMany();
    });

    it("should add product", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct1;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      expect(result.status).to.equal(201);
      expect(result.body).to.have.property("data");
      expect(result.body).to.have.property("message");
      expect(result.body.data).to.have.property("_id");
    });

    it("should not add product(invalid token)", async function() {
      const productDetails = common.validProduct1;
      const token = "1234567";

      const result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      expect(result.status).to.equal(401);
    });

    it("should not add product(missing required param)", async function() {
      const userDetails = common.validUser1;
      const productDetails = common.validProduct1;
      delete productDetails.productName;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      expect(result.status).to.equal(400);
    });
  });
});
