const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwt-auth");
const userHandler = require("../handlers/users");

router.use(jwtAuth());

router.get("/", userHandler.getUsers);

router.get("/:id", userHandler.getUserById);
router.put("/:id", userHandler.updateUser);
router.patch("/:id", userHandler.changePassword);

module.exports = router;
