const express = require("express");
const router = express.Router();    

const authController = require('../controllers/authController');  
const groupController = require('../controllers/groupController');       

router.use("/auth", authController);
router.use("/groups", groupController);

router.get('/', (req, res) => {
    res.send("Hello world");
})

module.exports = router;