const presentationModel = require('../models/presentationModel');
const slideModel = require('../models/slideModel');

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

exports.ListPresentations = async (user) => {
    let presentations = await presentationModel.listByOwnerID(user.id);
    return {
        ReturnCode: 200,
        Message: "list presentations successfully",
        Presentations: presentations === null ? [] : presentations
    };
}

exports.CreatePresentation = async (presentation) => {
    const presentationResponse = await presentationModel.add(presentation);
    const slide = {
        slide_type_id: 1,
        presentation_id: presentationResponse.id,
        content: ""
    }
    await slideModel.add(slide);
    return {
        ReturnCode: 200,
        Message: "create presentation successfully",
        Data: {
            Presentation: presentationResponse,
        }
    };
}

exports.DeletePresentation = async (userID, presentationID) => {
    let err = await isPresentationExisted(presentationID);
    if (err != null) {
        return err;
    }

    err = await isValidPermission(userID, presentationID);
    if (err != null) {
        return err;
    }

    const presentationResponse = await presentationModel.delete(presentationID, {is_deleted: true});
    return {
        ReturnCode: 200,
        Message: "delete presentation successfully",
        Data: {
            Presentation: presentationResponse,
        }
    };
}

exports.EditPresentation = async (userID, presentationID, presentationName) => {
    let err = await isPresentationExisted(presentationID);
    if (err != null) {
        return err;
    }

    err = await isValidPermission(userID, presentationID);
    if (err != null) {
        return err;
    }

    const presentationResponse = await presentationModel.update(presentationID, {name: presentationName});
    return {
        ReturnCode: 200,
        Message: "edit presentation successfully",
        Data: {
            Presentation: presentationResponse,
        }
    };
}

exports.GetPresentation = async (presentationID) => {
    const presentation = await presentationModel.getByID(presentationID);
    if(!presentation){
        return{
            ReturnCode: 404,
            Message: "presentation not found",
        }
    }
    //const presentationResponse = await presentationModel.update(presentationID, {name: presentationName});
    let slides = await slideModel.listPresentationID(presentationID);
    return {
        ReturnCode: 200,
        Message: "get presentation successfully",
        Data: {
            Presentation: presentation,
            Slides: slides
        }
    };
}