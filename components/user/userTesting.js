"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
let validUserId = "";
const inValidUserId = 2;
const userDetails = { name: "admin" };
const newUserDetails = { name: "testuser" };

module.exports = server => {
  describe("/User", function() {
    it("should give validation error details for missing id to get user /users GET", function(done) {
      chai
        .request(server)
        .get("/users")
        .end(function(err, res) {
          res.should.have.status(400);
          res.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        });
    });
    it("should add new user /users POST", function(done) {
      chai
        .request(server)
        .post("/users")
        .send(userDetails)
        .end(function(err, res) {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("_id");
          validUserId = res.body.data._id;
          done();
        });
    });
    it("should update user /users PUT", function(done) {
      newUserDetails._id = validUserId;
      chai
        .request(server)
        .put("/users")
        .send(newUserDetails)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        });
    });
    it("should give user details by _id on /users GET", function(done) {
      chai
        .request(server)
        .get(`/users?_id=${validUserId}`)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("message").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        });
    });
    it("should give empty user details for invalid id on /users GET", function(done) {
      chai
        .request(server)
        .get(`/users?_id=${inValidUserId}`)
        .end(function(err, res) {
          res.should.have.status(404);
          res.should.be.a("object");
          res.body.should.have.property("message").eql("Not Found");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        });
    });
    it("should delete user by id /users DELETE", function(done) {
      chai
        .request(server)
        .get(`/users?_id=${validUserId}`)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("message").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        });
    });
  });
};
