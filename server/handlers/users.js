const db = require("../models");
const { flattenObject } = require("../utilities/utilities");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      let users = await db.User.find(req.query).select("-password");
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      let user = await db.User.findById(req.params.id).select("-password");
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      let body = flattenObject(req.body);
      let user = await db.User.updateOne({ _id: req.params.id }, body);
      res.status(200).json({ status: "Success" });
    } catch (err) {
      next(err);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      let id = req.params.id;
      // check to make sure the new password and old password are different
      if (req.body.password === req.body.newPassword) {
        throw new Error("New password cannot be the same as previous password");
      }
      let user = await db.User.findById(id);
      if (user) {
        // check the original password to make sure it matches what is stored in the database
        let match = await user.comparePassword(req.body.password);
        // if the password matches, update it with the new value
        if (match) {
          user.password = req.body.newPassword;
          user.save();
        } else {
          throw new Error("Original password is not valid");
        }
        res.status(200).json({ status: "Success" });
      }
    } catch (err) {
      next(err);
    }
  }
};
