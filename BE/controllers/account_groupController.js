const express = require("express");
const router = express.Router();
const account_groupModel = require("../models/account_groupModel");

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

module.exports = router;
