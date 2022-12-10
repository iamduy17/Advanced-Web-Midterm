const presentationModel = require('../models/presentationModel');
const slideModel = require('../models/slideModel');

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

exports.DeletePresentation = async (presentationID, isDeleted) => {
    const presentation = await presentationModel.getByID(presentationID);
    if(!presentation){
        return{
            ReturnCode: 404,
            Message: "presentation not found",
        }
    }
    const presentationResponse = await presentationModel.delete(presentationID, {is_deleted: isDeleted});
    return {
        ReturnCode: 200,
        Message: "delete presentation successfully",
        Data: {
            Presentation: presentationResponse,
        }
    };
}

exports.EditPresentation = async (presentationID, presentationName) => {
    const presentation = await presentationModel.getByID(presentationID);
    if(!presentation){
        return{
            ReturnCode: 404,
            Message: "presentation not found",
        }
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