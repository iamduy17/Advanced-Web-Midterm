const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { AuthenticationError } = require("../utils/index");

router.post(
  "/login",
  authMiddleware.PassportLocalCheckLogin,
  async (req, res) => {
    try {
      const result = await authService.LoginLocal(req.user);

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

router.post("/register", async (req, res) => {
  try {
    const result = await authService.Register(req.body);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign up again!"
    });
  }
});

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const result = await authService.CheckEmailVerified(req);

    return res.json(result);
  } catch (error) {
    return res.json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign up again!"
    });
  }
});

router.post("/login/google", async (req, res) => {
  try {
    const result = await authService.LoginGoogle(req.body);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign in again!"
    });
  }
});

router.post("/forgotpass", async (req, res) => {
  try {
    const result = await authService.ForgotPass(req.body.usernameForgot);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign in again!"
    });
  }
});

router.post("/resetpass", async (req, res) => {
  try {
    const result = await authService.ResetPass(req.body);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign in again!"
    });
  }
});

module.exports = router;
