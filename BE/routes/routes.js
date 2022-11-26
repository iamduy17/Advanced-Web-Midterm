const express = require("express");
const router = express.Router();    

const authController = require('../controllers/authController');       

router.use("/auth", authController);

router.get('/', (req, res) => {
    res.send("Hello world");
})

module.exports = router;