const presentationModel = require('../models/presentationModel');
const slideModel = require('../models/slideModel');

exports.CreateSlide = async (user, slide) => {
    const presentation = await presentationModel.getByID(slide.presentation_id);
    if(!presentation){
        return{
            ReturnCode: 404,
            Message: "presentation_id is invalid",
        }
    }
    if(user.id !== presentation.owner_id){
        return{
            ReturnCode: 401,
            Message: "invalid permission",
        }
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

exports.DeleteSlide = async (slideID, isDeleted) => {
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