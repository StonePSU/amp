const db = require("../models");
const jwt = require("jsonwebtoken");

function getToken(user) {
  const payload = {
    iss: "Matt Krell",
    sub: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.roleName
  };
  const token = jwt.sign(payload, process.env.JWT_KEY);
  return token;
}

const authHandler = {
  signup: async function(req, res, next) {
    try {
      let user = await db.User.create(req.body);
      let token = getToken(user);

      res.status(201).json({ token });
    } catch (err) {
      if (err.code === 11000) {
        err.message = "Email address already used";
      }
      next(err);
    }
  },

  signin: async function(req, res, next) {
    console.log("about to signin");
    try {
      let user = await db.User.findOne({ emailAddress: req.body.emailAddress });
      if (!user) {
        let err = new Error("Email address not found");
        err.status = 404;
        next(err);
      }

      let match = await user.comparePassword(req.body.password);
      if (match) {
        let token = getToken(user);
        res.status(200).json({ token });
      } else {
        let err = new Error("Email address or password is invalid");
        err.status = 404;
        next(err);
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authHandler;
