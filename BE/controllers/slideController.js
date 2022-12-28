const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const slideService = require("../services/slideService");
const { AuthenticationError } = require("../utils/index");

router.post(
  "/create",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("create slide with req:", { req });
      const userID = req.user.id;
      const slide = {
        presentation_id: req.body.presentation_id,
        slide_type_id: req.body.slide_type_id,
        content: req.body.content
      };
      const result = await slideService.CreateSlide(userID, slide);

      return res.json(result);
    } catch (error) {
      console.log("create slide failed with error: ", error);
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

router.post(
  "/delete/:id",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("delete slide with req:", { req });
      const userID = req.user.id;
      const slideID = req.params.id;
      const result = await slideService.DeleteSlide(userID, slideID);

      return res.json(result);
    } catch (error) {
      console.log("delete slide failed with error: ", error);
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

router.post(
  "/edit/:id",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("edit slide with req:", { req });

      const slideID = req.params.id;
      const content = req.body.content;
      const slide_type_id = req.body.slide_type_id;
      const result = await slideService.EditSlide(
        slideID,
        slide_type_id,
        content
      );

      return res.json(result);
    } catch (error) {
      console.log("edit slide failed with error: ", error);
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);
router.get(
  "/edit/:id/slideshow",
  authMiddleware.PassportJWTCheckToken,
  async (req, res) => {
    try {
      console.log("get slide with req:", { req });

      const slideID = req.params.id;
      const result = await slideService.GetSlide(slideID);

      return res.json(result);
    } catch (error) {
      console.log("get slide failed with error: ", error);
      return res.status(401).json({
        ReturnCode: AuthenticationError.Error,
        Message: "Something is wrong. Please sign in again!"
      });
    }
  }
);

module.exports = router;
