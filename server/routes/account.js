const router = require("express").Router();
const accountHandler = require("../handlers/account");

router.post("/", accountHandler.addAccount);
router.get("/", accountHandler.getAccounts);
router.get("/:id", accountHandler.getAccountById);
router.put("/:id", accountHandler.updateAccount);

module.exports = router;
