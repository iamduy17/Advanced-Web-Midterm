const presentationModel = require("../models/presentationModel");
const slideModel = require("../models/slideModel");
const slideTypeModel = require("../models/slideTypeModel");

const isSlideExisted = async (slideID) => {
  const slide = await slideModel.getByID(slideID);
  if (!slide) {
    return {
      ReturnCode: 404,
      Message: "slide not found"
    };
  }
  return null;
};

const isPresentationExisted = async (presentationID) => {
  const presentation = await presentationModel.getByID(presentationID);
  if (!presentation) {
    return {
      ReturnCode: 404,
      Message: "presentation not found"
    };
  }
  return null;
};

const isSlideTypeExisted = async (slideTypeID) => {
  console.log(slideTypeID);
  const slideType = await slideTypeModel.getByID(slideTypeID);

  if (!slideType) {
    return {
      ReturnCode: 404,
      Message: "slide type not existed"
    };
  }
  return null;
};

const isValidPermission = async (userID, presentationID) => {
  const presentation = await presentationModel.getByID(presentationID);
  if (userID !== presentation?.owner_id) {
    return {
      ReturnCode: 401,
      Message: "invalid permission"
    };
  }
  return null;
};

exports.CreateSlide = async (userID, slide) => {
  let err = await isPresentationExisted(slide.presentation_id);
  if (err != null) {
    return err;
  }

  err = await isValidPermission(userID, slide.presentation_id);
  if (err != null) {
    return err;
  }
  console.log({ slide });
  err = await isSlideTypeExisted(slide.slide_type_id);

  if (err != null) {
    return err;
  }

  const presentation = await presentationModel.getByID(slide.presentation_id);
  console.log(presentation.slide_count + 1);
  presentationModel.updateSlideCount(slide.presentation_id, {
    slide_count: presentation.slide_count + 1
  });

  const slideResponse = await slideModel.add(slide);
  return {
    ReturnCode: 200,
    Message: "create slide successfully",
    Data: {
      Slide: slideResponse
    }
  };
};

exports.DeleteSlide = async (userID, slideID) => {
  let err = await isSlideExisted(slideID);
  if (err != null) {
    return err;
  }

  const slide = await slideModel.getByID(slideID);
  err = await isValidPermission(userID, slide.presentation_id);
  if (err != null) {
    return err;
  }

  const presentation = await presentationModel.getByID(slide.presentation_id);
  presentationModel.updateSlideCount(slide.presentation_id, {
    slide_count: presentation.slide_count - 1
  });

  const slideResponse = await slideModel.delete(slideID, { is_deleted: true });
  return {
    ReturnCode: 200,
    Message: "delete slide successfully",
    Data: {
      Slide: slideResponse[0]
    }
  };
};

exports.EditSlide = async (slideID, content) => {
  let err = await isSlideExisted(slideID);
  if (err != null) {
    return err;
  }

  const slideResponse = await slideModel.update(slideID, { content: content });
  return {
    ReturnCode: 200,
    Message: "edit slide successfully",
    Data: {
      Slide: slideResponse[0]
    }
  };
};

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
};
