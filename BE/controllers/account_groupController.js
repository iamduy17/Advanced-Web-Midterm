const express = require("express");
const router = express.Router();
const account_groupModel = require("../models/account_groupModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  res.json({
    account_group: res.account_group
  });
});

router.get("/t", async (req, res) => {
  const result = await account_groupModel.getAll();
  if (result) {
    res.json(result);
  } else {
    res.json("error");
  }
});

router.post("/", async (req, res) => {
  const result = await account_groupModel.add(req.body);
  if (result) {
    res.json(result);
  } else {
    res.json("error");
  }
});

router.post(
  "/roleUser",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    const result = await account_groupModel.getUserByIDGroup_IdUser(
      req.body.group_id,
      req.body.account_id
    );
    if (result) {
      res.json(result);
    } else {
      res.json("error");
    }
  }
);

router.post(
  "/groupowner",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    const result = await account_groupModel.getGroupOwnerByIDUser(
      req.body.account_id
    );
    if (result) {
      res.json(result);
    } else {
      res.json("error");
    }
  }
);

module.exports = router;
