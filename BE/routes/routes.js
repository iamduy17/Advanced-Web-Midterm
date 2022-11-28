const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');
const accountgroupController = require('../controllers/account_groupController');
const groupController = require('../controllers/groupController');

router.use("/auth", authController);
router.use("/account_group", accountgroupController);
router.use("/groups", groupController);

router.get('/', (req, res) => {
    res.send("Hello world");
})

module.exports = router;