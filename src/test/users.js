"use strict";

const chai = require("chai");
const request = require("supertest");

const models = require("../models");
const app = require("../app");
const common = require("./common");

const expect = chai.expect;
const User = models.user;

describe("Users", function() {
  beforeEach(async function() {
    await User.deleteMany();
  });

  describe("POST /users", function() {
    it("should register user", async function() {
      const userDetails = common.validUser1;
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
      expect(res.body.data).to.have.property("token");
      expect(res.body.data).to.have.property("expiry");
    });

    it("should not register user(duplicate user)", async function() {
      const userDetails = common.validUser2;
      await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      expect(res.status).to.equal(409);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
    });

    it("should not register user(invalid email)", async function() {
      const userDetails = common.invalidEmail;
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
    });

    it("should not register user(invalid password)", async function() {
      const userDetails = common.invalidPassword;
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
    });
  });
});
