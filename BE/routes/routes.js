const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const accountgroupController = require("../controllers/account_groupController");
const groupController = require("../controllers/groupController");
const presentationController = require("../controllers/presentationController");
const slideController = require("../controllers/slideController");

router.use("/auth", authController);
router.use("/account_group", accountgroupController);
router.use("/groups", groupController);
router.use("/presentation", presentationController);
router.use("/slide", slideController);

router.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
