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

  describe("GET /products", function() {
    beforeEach(async function() {
      await Product.deleteMany();
      await User.deleteMany();
    });

    it("should get product by _id", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .get(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${token}`);

      expect(result.status).to.equal(200);
      expect(result.body).to.have.property("data");
      expect(result.body).to.have.property("message");
      expect(result.body.data).to.have.property("_id");
      expect(result.body.data._id).to.equal(_id);
    });

    it("should fail to get product (no token)", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app).get(`/api/v1/products?_id=${_id}`);

      expect(result.status).to.equal(401);
    });

    it("should fail to get product(invalid _id)", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = "1234";

      result = await request(app)
        .get(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${token}`);

      expect(result.status).to.equal(404);
    });

    it("should fail to get product(not the right role)", async function() {
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(common.validUser4);

      const tokenForUser4 = result.body.data.token;

      result = await request(app)
        .post("/api/v1/users/register")
        .send(common.validUser5);

      const tokenForUser5 = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${tokenForUser4}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .get(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${tokenForUser5}`);

      expect(result.status).to.equal(401);
    });
  });

  describe("PUT /products", function() {
    beforeEach(async function() {
      await Product.deleteMany();
      await User.deleteMany();
    });

    it("should update product successfully", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .put(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${token}`)
        .send(common.updateProductDetails);

      expect(result.status).to.equal(200);
    });

    it("should fail to update product (no token)", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .put(`/api/v1/products?_id=${_id}`)
        .send(common.updateProductDetails);

      expect(result.status).to.equal(401);
    });

    it("should fail to get product(invalid _id)", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = "1234";

      result = await request(app)
        .put(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${token}`)
        .send(common.updateProductDetails);

      expect(result.status).to.equal(404);
    });

    it("should fail to get product(not the right role)", async function() {
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(common.validUser4);

      const tokenForUser4 = result.body.data.token;

      result = await request(app)
        .post("/api/v1/users/register")
        .send(common.validUser5);

      const tokenForUser5 = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${tokenForUser4}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .put(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${tokenForUser5}`)
        .send(common.updateProductDetails);
      expect(result.status).to.equal(401);
    });
  });

  describe("DELETE /products", function() {
    beforeEach(async function() {
      await Product.deleteMany();
      await User.deleteMany();
    });

    it("should delete product successfully", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .delete(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${token}`);

      expect(result.status).to.equal(200);
    });

    it("should fail to delete product (no token)", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app).delete(`/api/v1/products?_id=${_id}`);

      expect(result.status).to.equal(401);
    });

    it("should fail to update product(invalid _id)", async function() {
      const userDetails = common.validUser4;
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const token = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${token}`)
        .send(productDetails);

      const _id = "1234";

      result = await request(app)
        .delete(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${token}`);

      expect(result.status).to.equal(404);
    });

    it("should fail to update product(not the right role)", async function() {
      const productDetails = common.validProduct2;

      let result = await request(app)
        .post("/api/v1/users/register")
        .send(common.validUser4);

      const tokenForUser4 = result.body.data.token;

      result = await request(app)
        .post("/api/v1/users/register")
        .send(common.validUser5);

      const tokenForUser5 = result.body.data.token;

      result = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `bearer ${tokenForUser4}`)
        .send(productDetails);

      const _id = result.body.data._id;

      result = await request(app)
        .delete(`/api/v1/products?_id=${_id}`)
        .set("Authorization", `bearer ${tokenForUser5}`);

      expect(result.status).to.equal(401);
    });
  });
});
