"use strict";
require("dotenv").config();

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

const services = require("../services");
const common = require("./common");
const models = require("../models");

const userService = services.users;
const User = models.user;

chai.use(chaiAsPromised);

describe("Services testing", function() {
  beforeEach(async function() {
    await User.deleteMany();
  });

  it("should fail to save the user(dulicate)", async function() {
    const userDetails = common.validUser3;
    await userService.saveUser(userDetails);
    return expect(userService.saveUser(userDetails)).to.be.rejected;
  });

  it("should get user by email", async function() {
    const userDetails = common.validUser3;
    await userService.saveUser(userDetails);
    const user = await userService.getUserByEmail(userDetails.email);
    expect(user).to.have.property("_id");
    expect(user).to.have.property("email");
    expect(user).to.have.property("password");
    expect(user.email).to.be.equal(userDetails.email);
  });
});
