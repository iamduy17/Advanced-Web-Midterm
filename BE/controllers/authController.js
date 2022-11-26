const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");
const authService = require('../services/authService');
const {CLIENT_URL} = require('../config/index');
const { AuthenticationError, GenerateToken } = require("../utils/index");
const authModel = require("../models/authModel");


router.post('/login', authMiddleware.PassportLocalCheckLogin, async (req, res) => {
    try {
        const result = await authService.LoginLocal(req.user);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/register', async (req, res) => {    
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

        console.log(result);
        return res.json(result);
	} catch (error) {
		return res.json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign up again!" 
        });
	}
});

router.get('/google',
  passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/google/failure'
}));

router.get('/login/success', (req, res) => {
    try {
        const result = authService.HandleLoginSuccess(req);
        //console.log(process.env.NODE_ENV);
        //console.log(CLIENT_URL);
        console.log(result);
        return res.json(result);
    } catch (error) {
        return res.json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong!" 
        })
    }
});

router.get('/google/failure', (req, res) => {
    return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!" 
    });
});

router.get("/logout", (req, res) => {
    req.user = null;
    return res.status(200).json({
        ReturnCode: 1,
        Message: "Log out successfully!" 
    });
})

module.exports = router;