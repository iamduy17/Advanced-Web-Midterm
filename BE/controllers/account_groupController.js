const express = require("express");
const router = express.Router();
const account_groupModel = require("../models/account_groupModel");

router.get('/', async (req, res) => {
    const reult = await account_groupModel.getUserByIDGroup_IdUser(3, 2);
    if (reult) {
        res.json("data...");
        console.log(123);
    }
    else {
        res.json("error"); 7
    }
})

router.get('/t', async (req, res) => {
    const result = await account_groupModel.getAll();
    if (result) {
        res.json(result);
    }
    else {
        res.json("error");
    }
});

let account_group_1 = {
    group_id: 3,
    account_id: 2,
    role: 1
};

router.post('/', async (req, res) => {
    const reult = await account_groupModel.add(account_group_1);
    if (reult) {
        res.json("data ...");
    }
    else {
        res.json("error");
    }
})

module.exports = router;