const presentationModel = require('../models/presentationModel');
const slideModel = require('../models/slideModel');
const slideService = require('./slideService');

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

    presentations?.map((item) => {
        let toCreateDateList = new Date(item.created_at).toISOString().split('T');
        item.created_at = toCreateDateList[0] + " " + toCreateDateList[1].split('.')[0];

        let toUpdateDateList = new Date(item.updated_at).toISOString().split('T');
        item.updated_at = toUpdateDateList[0] + " " + toUpdateDateList[1].split('.')[0];        
    });

    return {
        ReturnCode: 200,
        Message: "list presentations successfully",
        Presentations: presentations === null ? [] : presentations
    };
}

exports.CreatePresentation = async (presentation) => {
    const presentationResponse = await presentationModel.add(presentation);
    const content = {
        title: "Multiple Choice",
        data: [
            {
                'name': 'Option 1',
                'count': 0
            },
            {
                'name': 'Option 2',
                'count': 0
            },
            {
                'name': 'Option 3',
                'count': 0
            }
        ]
    };

    const slide = {
        slide_type_id: 1,
        presentation_id: presentationResponse.id,
        content: JSON.stringify(content)
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

    const slides = await slideModel.listByPresentationID(presentationID);
    if(slides){
        for(let i = 0; i < slides.length; i++){
            slideService.DeleteSlide(userID, slides[i].id);
        }
    }

    const presentationResponse = await presentationModel.delete(presentationID, {is_deleted: true});
    return {
        ReturnCode: 200,
        Message: "delete presentation successfully",
        Data: {
            Presentation: presentationResponse[0],
        }
    };
}

exports.EditPresentation = async (userID, presentationID, presentationName, updatedTime) => {
    let err = await isPresentationExisted(presentationID);
    if (err != null) {
        return err;
    }

    err = await isValidPermission(userID, presentationID);
    if (err != null) {
        return err;
    }

    const presentationResponse = await presentationModel.update(presentationID, {name: presentationName, updated_at: updatedTime});
    return {
        ReturnCode: 200,
        Message: "edit presentation successfully",
        Data: {
            Presentation: presentationResponse[0],
        }
    };
}

exports.GetPresentation = async (presentationID) => {
    let err = await isPresentationExisted(presentationID);
    if (err != null) {
        return err;
    }

    const presentation = await presentationModel.getByID(presentationID);
    let slides = await slideModel.listByPresentationID(presentationID);
    return {
        ReturnCode: 200,
        Message: "get presentation successfully",
        Data: {
            Presentation: presentation,
            Slides: slides
        }
    };
}

exports.GetAllSlideOfPresentation = async (presentationId) => {
    let err = await isPresentationExisted(presentationId);
    if (err != null) {
        return err;
    }

    const slide = await slideModel.getAllByID(presentationId);
    return {
        ReturnCode: 200,
        Message: "get presentation successfully",
        Data: {
            Slide: slide
        }
    };
}