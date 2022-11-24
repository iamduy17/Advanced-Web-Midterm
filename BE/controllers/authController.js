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

        res.json(result);
    } catch (error) {
        res.status(401).json({
            'ReturnCode': AuthenticationError.Error,
            'Message': "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/register', async (req, res) => {    
    try {
        const result = await authService.Register(req.body);

        res.json(result);
    } catch (error) {
        res.status(401).json({
            'ReturnCode': AuthenticationError.Error,
            'Message': "Something is wrong. Please sign up again!" 
        });
    }
});

router.get("/:id/verify/:token", async (req, res) => {
	try {
		const result = await authService.CheckEmailVerified(req);

        console.log(result);
        if(result.ReturnCode == AuthenticationError.Error) {
            res.status(400).json(result);
        }
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
            'ReturnCode': AuthenticationError.Error,
            'Message': "Something is wrong. Please sign up again!" 
        });
	}
});

router.get('/google',
  passport.authenticate('google', {session: false,  scope:[ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        session: false,
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/google/failure'
}));

router.get('/google/success', (req, res) => {
    try {
        const token = GenerateToken(req.user.email, 'google')
        res.status(200).json({
            'ReturnCode': 1,
            'Message': "Sign in with Google successfully!",
            'Token': token,
        });
    } catch (error) {
        res.status(401).json({
            'ReturnCode': AuthenticationError.Error,
            'Message': "Something is wrong. Please sign in again!" 
        });
    }
});

router.get('/google/failure', (req, res) => {
    res.status(401).json({
        'ReturnCode': AuthenticationError.Error,
        'Message': "Something is wrong. Please sign in again!" 
    });
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.status(200).json({
        'ReturnCode': 1,
        'Message': "Log out successfully!" 
    });
})

module.exports = router;