const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const presentationService = require('../services/presentationService');
const { AuthenticationError} = require("../utils/index");


router.get('/', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        const result = await presentationService.ListPresentations(req.user);

        return res.json(result);
    } catch (error) {
        console.log("list presentations failed with error: ", error);
        
        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/create', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        console.log("create presentation with req:", {req});
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
        console.log("create presentation failed with error: ", error);

        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/delete/:id', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        console.log("delete presentation with req:", {req});
        const userID = req.user.id;
        const presentationID = req.params.id;
        const result = await presentationService.DeletePresentation(userID, presentationID);

        return res.json(result);
    } catch (error) {
        console.log("delete presentation failed with error: ", error);

        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.post('/edit/:id', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const presentationID = req.params.id;
        const presentationName = req.body.name;
        const updatedTime = req.body.updated_at;
        console.log(updatedTime);
        const result = await presentationService.EditPresentation(userID, presentationID, presentationName, updatedTime);

        return res.json(result);
    } catch (error) {
        console.log("edit presentation failed with error: ", error);

        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.get('/edit/:id', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        console.log("get presentation with req:", {req});
        const presentationID = req.params.id;
        const result = await presentationService.GetPresentation(presentationID);

        return res.json(result);
    } catch (error) {
        console.log("get presentation failed with error: ", error);

        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
});

router.get('/get/:id', authMiddleware.PassportJWTCheckToken, async (req, res) => {
    try {
        const presentationID = req.params.id;
        const result = await presentationService.GetAllSlideOfPresentation(presentationID);

        return res.json(result);
    } catch (error) {
        console.log("get presentation failed with error: ", error);

        return res.status(401).json({
            ReturnCode: AuthenticationError.Error,
            Message: "Something is wrong. Please sign in again!" 
        })
    }
})

module.exports = router;