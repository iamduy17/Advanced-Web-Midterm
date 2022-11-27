const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const groupService = require('../services/groupService');
const { AuthenticationError} = require("../utils/index");


router.get('/', authMiddleware.PassportJWTCheckToken, (req, res) => {
    try {
        console.log({req});
        const result = groupService.ListGroups(req.user);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});


module.exports = router;