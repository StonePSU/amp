const express = require("express");
const jwtAuth = require("../middleware/jwt-auth");
const router = express.Router();

router.use(jwtAuth());
router.get("/helloworld", (req, res, next) => {
  res.status(200).send("Hello World");
});

module.exports = router;
