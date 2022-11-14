const express = require("express");
const router = express.Router();            

// router.get("/", registerController.helo);

router.get('/', (req, res) => {
    res.send("Hello world");
})

module.exports = router;