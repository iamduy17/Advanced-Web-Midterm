const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const groupService = require("../services/groupService");
const { AuthenticationError } = require("../utils/index");

router.get("/", authMiddleware.PassportJWTCheckToken, async (req, res) => {
  try {
    console.log({ req });
    const result = await groupService.ListGroups(req.user);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign in again!"
    });
  }
});

router.post(
  "/create",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      const userID = req.user.id;
      const group = {
        name: req.body.name,
        description: req.body.description,
        invitation_link: ""
      };
      const result = await groupService.CreateGroup(group, userID);

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

router.get("/:id", authMiddleware.PassportJWTCheckToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await groupService.GetGroup(id);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign in again!"
    });
  }
});

router.post(
  "/changeRole",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      //const userID = req.user.id;
      //check permission user.
      console.log(req.body);
      const result = await groupService.SetRole(
        req.body.group_id,
        req.body.account_id,
        req.body.role
      );

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

module.exports = router;
