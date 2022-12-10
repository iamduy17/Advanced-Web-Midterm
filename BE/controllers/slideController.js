const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const slideService = require('../services/slideService');
const { AuthenticationError} = require("../utils/index");

router.post('/create', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const slide = {
            presentation_id: req.body.presentation_id,
            slide_type_id: req.body.slide_type_id,
            content: req.body.content
        }
        const result = await slideService.CreateSlide(slide);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/delete', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        //add check permission
        const presentationID = req.body.presentation_id;
        const isDeleted = true;
        const result = await presentationService.DeletePresentation(presentationID, isDeleted);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/edit/:id', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        //add check permission
        const presentationID = req.params.id;
        const presentationName = req.body.name;
        const result = await presentationService.EditPresentation(presentationID, presentationName);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.get('/edit/:id', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        //add check permission
        const presentationID = req.params.id;
        const result = await presentationService.GetPresentation(presentationID);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});


module.exports = router;