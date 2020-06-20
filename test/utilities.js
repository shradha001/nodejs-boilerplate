"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";

const expect = chai.expect;
chai.use(chaiAsPromised);

const utilities = require("../src/utilities");
const common = require("./common");

const { hashUtil, jwtUtil } = utilities;

describe("Utilities", function() {
  describe("Hash utlities", function() {
    it("should successfully hash a data", async function() {
      const data = common.dataToHash;
      const result = await hashUtil.hashData(data);
      expect(result).to.exist;
    });

    it("should fail to hash the data(null)", async function() {
      const data = null;
      return expect(hashUtil.hashData(data)).to.be.rejected;
    });

    it("should successfully compare hash a data", async function() {
      const data = common.dataToHash;
      const hash = await hashUtil.hashData(data);
      const result = await hashUtil.compareHash(data, hash);
      expect(result).to.be.equal(true);
    });

    it("should return false on hash comparison", async function() {
      const data = common.dataToHash;
      const hash = await hashUtil.hashData(data);
      const result = await hashUtil.compareHash("data", hash);
      expect(result).to.be.equal(false);
    });
  });

  describe("Jwt utlities", function() {
    it("should successfully generate jwt token", async function() {
      const data = common.jwtPayload;
      const result = await jwtUtil.generateJWT(data);
      expect(result).to.exist;
    });

    it("should fail to generate jwt token(null)", async function() {
      const data = null;
      return expect(jwtUtil.generateJWT(data)).to.be.rejected;
    });
  });
});
