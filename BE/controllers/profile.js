const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware.PassportJWTCheckToken, (req, res) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user
  });
});

module.exports = router;
