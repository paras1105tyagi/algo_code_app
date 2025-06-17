const express = require("express");
const problemRouter = require("./problem");
const accountsRouter = require("./accounts");

const router = express.Router();

router.use("/problem", problemRouter);
router.use("/accounts", accountsRouter);

module.exports = router; 