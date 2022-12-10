const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const presentationService = require('../services/presentationService');
const { AuthenticationError} = require("../utils/index");


router.get('/', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        console.log("list presentations with req:", {req});
        const result = await presentationService.ListPresentations(req.user);

        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/create', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const presentation = {
            name: req.body.name,
            created_at: req.body.created_at,
            updated_at: req.body.created_at,
            is_deleted: false,
            slide_count: 1,
            owner_id: userID
        }
        const result = await presentationService.CreatePresentation(presentation);

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