const presentationModel = require('../models/presentationModel');
const slideModel = require('../models/slideModel');

const isSlideExisted = async (slideID) => {
    const slide = await slideModel.getByID(slideID);
    if (!slide) {
        return {
            ReturnCode: 404,
            Message: "slide not found",
        }
    }
    return null;
}

const isPresentationExisted = async (presentationID) => {
    const presentation = await presentationModel.getByID(presentationID);
    if (!presentation) {
        return {
            ReturnCode: 404,
            Message: "presentation not found",
        }
    }
    return null;
}

const isValidPermission = async (userID, presentationID) => {
    const presentation = await presentationModel.getByID(presentationID);
    if (userID !== presentation.owner_id) {
        return {
            ReturnCode: 401,
            Message: "invalid permission",
        }
    }
    return null;
}

exports.CreateSlide = async (userID, slide) => {
    let err = await isPresentationExisted(slide.presentation_id);
    if (err != null) {
        return err;
    }

    err = await isValidPermission(userID, slide.presentation_id);
    if (err != null) {
        return err;
    }

    const slideResponse = await slideModel.add(slide);
    return {
        ReturnCode: 200,
        Message: "create slide successfully",
        Data: {
            Slide: slideResponse,
        }
    };
}

exports.DeleteSlide = async (userID, slideID) => {
    let err = await isSlideExisted(slideID);
    if (err != null) {
        return err;
    }

    const slide = await slideModel.getByID(slideID);
    err = await isPresentationExisted(slide.presentation_id);
    if (err != null) {
        return err;
    }

    err = await isValidPermission(userID, slide.presentation_id);
    if (err != null) {
        return err;
    }

    const presentationResponse = await presentationModel.delete(slideID, { is_deleted: isDeleted });
    return {
        ReturnCode: 200,
        Message: "delete presentation successfully",
        Data: {
            Presentation: presentationResponse[0],
        }
    };
}

exports.EditSlide = async (slideID, content) => {
    let err = await isSlideExisted(slideID);
    if (err != null) {
        return err;
    }

    const slide = await slideModel.getByID(slideID);
    err = await isPresentationExisted(slide.presentation_id);
    if (err != null) {
        return err;
    }

    const presentationResponse = await presentationModel.update(presentationID, { content: content });
    return {
        ReturnCode: 200,
        Message: "edit presentation successfully",
        Data: {
            Presentation: presentationResponse[0],
        }
    };
}

exports.GetSlide = async (slideID) => {
    let err = await isSlideExisted(slideID);
    if (err != null) {
        return err;
    }

    const slide = await slideModel.getByID(slideID);
    return {
        ReturnCode: 200,
        Message: "get presentation successfully",
        Data: {
            Slide: slide
        }
    };
}