const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const groupService = require("../services/groupService");
const { AuthenticationError } = require("../utils/index");

router.get("/", authMiddleware.PassportJWTCheckToken, async (req, res) => {
  try {
    console.log("list groups with req:", { req });
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
      console.log("create group with req:", { req });
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
    console.log("get group with req:", { req });
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
      console.log("change role with req:", { req });
      const userID = req.user.id;
      console.log(req.body);
      const result = await groupService.SetRole(
        req.body.group_id,
        req.body.account_id,
        req.body.role,
        userID
      );

      return res.json(result);
    } catch (error) {
      console.log("change role failed with err: " + error);
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

router.post(
  "/removeMember",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("remove member with req:", { req });
      const userID = req.user.id;
      const result = await groupService.RemoveMember(
        req.body.group_id,
        req.body.account_id,
        userID
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

router.post(
  "/removeGroup",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("remove group with req:", { req });
      const userID = req.user.id;
      const result = await groupService.RemoveGroup(req.body.group_id, userID);

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

router.post(
  "/isInGroup",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("remove group with req:", { req });
      const userID = req.user.id;
      const groupID = req.body.group_id;
      const result = await groupService.IsInGroup(groupID, userID);

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
