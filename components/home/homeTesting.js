"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();

chai.use(chaiHttp);
module.exports = server => {
  describe("/Home", function() {
    it("should give OK message on / GET", function(done) {
      chai
        .request(server)
        .get("/")
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
};
