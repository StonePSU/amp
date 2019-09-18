const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = require("chai").should();
const db = require("../models");

chai.use(chaiHttp);

describe("Authorization", () => {
  before(done => {
    db.User.deleteOne({ emailAddress: "test@test.com" }, err => {
      done();
    });
  });

  describe("/signup", () => {
    it("it should create a new user", done => {
      let user = {
        emailAddress: "test@test.com",
        firstName: "Test",
        lastName: "Test",
        password: "testabc123",
        profileImageUrl: "",
        roleName: "ADMIN_USER",
        address: {
          addressLine1: "Test Street",
          city: "Test City",
          state: "PA",
          postalCode: "19999"
        }
      };

      chai
        .request(server)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.be.a("object");
          res.body.should.have.property("token");
          done();
        });
    });

    it("it should not allow a user to be created with no email address", done => {
      let user = {
        firstName: "Test",
        lastName: "Test"
      };

      chai
        .request(server)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    describe("/signin", () => {
      it("it should log in the user", done => {
        let user = {
          emailAddress: "test@test.com",
          password: "testabc123"
        };

        chai
          .request(server)
          .post("/api/auth/signin")
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("token");
            done();
          });
      });
    });
  });
});
