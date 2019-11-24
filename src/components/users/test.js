"use strict";
const chai = require("chai");
const request = require("supertest");
const app = require("../../app");
const expect = chai.expect;

const User = require("./model");

describe("Users", function() {
  beforeEach(async function() {
    await User.deleteMany();
  });

  describe("GET /users", function() {
    it("should give user details by _id ", async function() {
      const users = [{ _id: "1", name: "test_one" }];
      await User.insertMany(users);
      const res = await request(app).get(`/api/v1/users?_id=1`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
      expect(res.body.data).to.be.an("array");
      expect(res.body.data[0])
        .to.have.property("name")
        .eql("test_one");
    });

    it("should give empty user details for invalid id", async function() {
      const res = await request(app).get(`/api/v1/users?_id=10`);
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
    });
  });
  describe("POST /users", function() {
    it("should add new user", async function() {
      const userDetails = { name: "admin" };
      const res = await request(app)
        .post("/api/v1/users")
        .send(userDetails);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
      expect(res.body.data).to.have.property("_id");
    });

    it("should throw error for missing _id", async function() {
      const res = await request(app).put("/api/v1/users");
      expect(res.status).to.equal(400);
    });
  });
  describe("UPDATE /users", function() {
    it("should update user", async function() {
      const users = [{ _id: "2", name: "test_two" }];
      await User.insertMany(users);
      let newUserDetails = { name: "test_three" };
      let userId = "2";
      const res = await request(app)
        .put(`/api/v1/users?_id=${userId}`)
        .send(newUserDetails);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data");
      expect(res.body).to.have.property("message");
    });

    it("should throw error for missing _id", async function() {
      const res = await request(app).delete("/api/v1/users");
      expect(res.status).to.equal(400);
    });
  });
  describe("DELETE /users", function() {
    it("should delete user by id", async function() {
      const users = [{ _id: "3", name: "test_three" }];
      await User.insertMany(users);
      const res = await request(app).delete("/api/v1/users?_id=3");
      expect(res.status).to.equal(200);
    });
  });
});
