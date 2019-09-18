const db = require("../models");
const { flattenObject } = require("../utilities/utilities.js");

module.exports = {
  addAccount: async function(req, res, next) {
    try {
      let account = await db.Account.create(req.body);
      res.status(201).json(account);
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        err.message = "KAD Number already exists";
      }
      next(err);
    }
  },
  getAccountById: async function(req, res, next) {
    try {
      let account = await db.Account.findById(req.params.id);
      res.status(200).json(account);
    } catch (err) {
      next(err);
    }
  },
  getAccounts: async function(req, res, next) {
    try {
      let account = await db.Account.find(req.query);
      res.status(200).json(account);
    } catch (err) {
      next(err);
    }
  },
  updateAccount: async function(req, res, next) {
    try {
      let body = flattenObject(req.body);

      let user = await db.Account.findOneAndUpdate(
        { _id: req.params.id },
        body
      );
      res.status(200).json({ status: "Success" });
    } catch (err) {
      next(err);
    }
  }
};
