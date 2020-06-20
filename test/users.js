"use strict";

import chai from "chai";
import request from "supertest";

import * as models from "../src/models";
import app from "../src/app";
import * as common from "./common";

const expect = chai.expect;
const User = models.user;

describe("Users", function() {
  describe("POST /users/register", function() {
    beforeEach(async function() {
      await User.deleteMany();
    });
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

  describe("POST /users/login", function() {
    beforeEach(async function() {
      await User.deleteMany();
    });

    it("should login user successfully", async function() {
      const userDetails = common.validUser1;
      await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      const res = await request(app)
        .post("/api/v1/users/login")
        .send(userDetails);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
      expect(res.body.data).to.have.property("token");
      expect(res.body.data).to.have.property("expiry");
    });

    it("should fail to login user (invalid  email)", async function() {
      const userDetails = common.validUser1;
      await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      userDetails.email = "abc@gmail.com";
      const res = await request(app)
        .post("/api/v1/users/login")
        .send(userDetails);

      expect(res.status).to.equal(401);
    });

    it("should fail to login user (invalid  password)", async function() {
      const userDetails = common.validUser1;
      await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      userDetails.password = "Testing123";

      const res = await request(app)
        .post("/api/v1/users/login")
        .send(userDetails);

      expect(res.status).to.equal(401);
    });

    it("should fail to login user (missing  password)", async function() {
      const userDetails = common.validUser1;
      await request(app)
        .post("/api/v1/users/register")
        .send(userDetails);

      userDetails.password = null;

      const res = await request(app)
        .post("/api/v1/users/login")
        .send(userDetails);

      expect(res.status).to.equal(400);
    });
  });
});
