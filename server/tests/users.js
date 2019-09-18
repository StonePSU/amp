const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../server");
const db = require("../models");

chai.use(chaiHttp);
let token = "Bearer ";
let userId;

describe("User Management", () => {
  before(done => {
    let user = {
      emailAddress: "test@test.com",
      password: "testabc123"
    };

    chai
      .request(server)
      .post("/api/auth/signin")
      .send(user)
      .end((err, res) => {
        token += res.body.token;
        userId = res.body.id;
        done();
      });
  });

  describe("/GET All Users", () => {
    it("it should not allow the request without a valid token", done => {
      chai
        .request(server)
        .get("/api/users")
        .send()
        .end((err, users) => {
          users.should.have.status(401);
          done();
        });
    });

    it("it should get all users", done => {
      chai
        .request(server)
        .get("/api/users")
        .set("authorization", token)
        .send()
        .end((err, users) => {
          users.should.have.status(200);
          users.body.should.be.a("array");
          users.body[0].should.have.property("firstName");
          users.body[0].should.have.property("lastName");
          users.body[0].should.have.property("emailAddress");
          users.body[0].should.have.property("roleName");
          users.body[0].should.have.property("_id");
          userId = users.body[0]._id;
          done();
        });
    });
  });

  describe("/GET User", () => {
    it("it should not allow the request without a valid token", done => {
      chai
        .request(server)
        .get(`/api/users/${userId}`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("it should get the correct user", done => {
      chai
        .request(server)
        .get(`/api/users/${userId}`)
        .set("authorization", token)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("firstName");
          res.body.should.have.property("lastName");
          res.body.should.have.property("emailAddress");
          res.body.should.have.property("roleName");
          done();
        });
    });
  });

  describe("/PUT User", () => {
    it("it should not allow the request without a valid token", done => {
      let user = {
        firstName: "Bob"
      };
      chai
        .request(server)
        .put(`/api/users/${userId}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("it should successfully update the user", done => {
      let user = {
        firstName: "Bob"
      };
      chai
        .request(server)
        .put(`/api/users/${userId}`)
        .set("authorization", token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.equal("Success");
          done();
        });
    });
  });
});
