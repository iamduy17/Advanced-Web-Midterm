const presentationModel = require("../models/presentationModel");
const slideModel = require("../models/slideModel");
const accountPresentationModel = require("../models/accountPresentationModel");
const authModel = require("../models/authModel");
const slideService = require("./slideService");
const sendMailCollab = require("../utils/sendMailCollab");
const { CLIENT_URL } = require("../config/index");

const ROLE_OWNER = 1;
const ROLE_COLLABORATOR = 2;

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

const isValidPermission = async (userID, presentationID) => {
  const accountPresentation =
    await accountPresentationModel.getByAccountIDAndPresentationID(
      userID,
      presentationID
    );
  if (!accountPresentation || accountPresentation.role !== ROLE_OWNER) {
    return {
      ReturnCode: 401,
      Message: "invalid permission"
    };
  }
  return null;
};

const isAccountExisted = async (accountID) => {
  const account = await authModel.getUserByID(accountID);
  if (!account) {
    return {
      ReturnCode: 404,
      Message: "user not found"
    };
  }
  return null;
};

const isAccountPresentationExisted = async (presentationID, userID) => {
  const accountPresentationResponse =
    await accountPresentationModel.getByAccountIDAndPresentationID(
      userID,
      presentationID
    );
  if (!accountPresentationResponse) {
    return {
      ReturnCode: 404,
      Message: "user not collaborate this presentation"
    };
  }
  return null;
};

exports.ListPresentations = async (user) => {
  const presentations = [];
  const accountPresentations = await accountPresentationModel.listByAccountID(
    user.id
  );
  if (accountPresentations) {
    for (let i = 0; i < accountPresentations.length; i++) {
      const presentation = await presentationModel.getByID(
        accountPresentations[i].presentation_id
      );
      const accountPresentationOwner =
        await accountPresentationModel.getByPresentationIDAndRole(
          accountPresentations[i].presentation_id,
          ROLE_OWNER
        );
      const owner = await authModel.getUserByID(
        accountPresentationOwner.account_id
      );
      presentation.owner = {
        id: owner.id,
        username: owner.username
      };

      presentations.push(presentation);
    }
  }
  presentations?.map((item) => {
    item.created_at = new Date(item.created_at).toLocaleString(
      "es-ES",
      {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      },
      { timeZone: "Asia/Bangkok" }
    );
    item.updated_at = new Date(item.updated_at).toLocaleString(
      "es-ES",
      {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      },
      { timeZone: "Asia/Bangkok" }
    );
  });

  return {
    ReturnCode: 200,
    Message: "list presentations successfully",
    Presentations: presentations === null ? [] : presentations
  };
};

exports.CreatePresentation = async (presentation, userID) => {
  const presentationResponse = await presentationModel.add(presentation);
  const content = {
    value: 1,
    title: "Multiple Choice",
    data: [
      {
        name: "Option 1",
        count: 0
      },
      {
        name: "Option 2",
        count: 0
      },
      {
        name: "Option 3",
        count: 0
      }
    ]
  };

  const slide = {
    slide_type_id: 1,
    presentation_id: presentationResponse.id,
    content: JSON.stringify(content)
  };
  await slideModel.add(slide);
  const account_presentation = {
    presentation_id: presentationResponse.id,
    account_id: userID,
    role: ROLE_OWNER
  };
  await accountPresentationModel.add(account_presentation);
  return {
    ReturnCode: 200,
    Message: "create presentation successfully",
    Data: {
      Presentation: presentationResponse
    }
  };
};

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
  if (slides) {
    for (let i = 0; i < slides.length; i++) {
      slideService.DeleteSlide(userID, slides[i].id);
    }
  }

  const accountPresentations =
    await accountPresentationModel.listByPresentationID(presentationID);
  if (accountPresentations) {
    for (let i = 0; i < accountPresentations.length; i++) {
      await accountPresentationModel.del(accountPresentations[i].id);
    }
  }

  const presentationResponse = await presentationModel.delete(presentationID, {
    is_deleted: true
  });
  return {
    ReturnCode: 200,
    Message: "delete presentation successfully",
    Data: {
      Presentation: presentationResponse[0]
    }
  };
};

exports.EditPresentation = async (
  userID,
  presentationID,
  presentationName,
  updatedTime
) => {
  let err = await isPresentationExisted(presentationID);
  if (err != null) {
    return err;
  }

  err = await isValidPermission(userID, presentationID);
  if (err != null) {
    return err;
  }

  const presentationResponse = await presentationModel.update(presentationID, {
    name: presentationName,
    updated_at: updatedTime
  });
  return {
    ReturnCode: 200,
    Message: "edit presentation successfully",
    Data: {
      Presentation: presentationResponse[0]
    }
  };
};

exports.GetPresentation = async (presentationID) => {
  let err = await isPresentationExisted(presentationID);
  if (err != null) {
    return err;
  }

  const presentation = await presentationModel.getByID(presentationID);
  let slides = await slideModel.listByPresentationID(presentationID);
  let accountPresentations =
    await accountPresentationModel.listByPresentationID(presentationID);
  const owners = [];
  const collaborators = [];
  if (!accountPresentations) {
    return {
      ReturnCode: 200,
      Message: "get presentation successfully",
      Data: {
        Presentation: presentation,
        Slides: slides,
        Owners: owners,
        Collaborators: collaborators
      }
    };
  }
  for (let i = 0; i < accountPresentations.length; i++) {
    const account = await authModel.getUserByID(
      accountPresentations[i].account_id
    );
    const { id, username } = account;
    switch (accountPresentations[i].role) {
      case ROLE_OWNER:
        owners.push({ id, username });
        break;
      case ROLE_COLLABORATOR:
        collaborators.push({ id, username });
        break;
    }
  }
  return {
    ReturnCode: 200,
    Message: "get presentation successfully",
    Data: {
      Presentation: presentation,
      Slides: slides,
      Owners: owners,
      Collaborators: collaborators
    }
  };
};

exports.AddCollaborator = async (presentationID, email, selfUserID) => {
  let err = await isPresentationExisted(presentationID);
  if (err != null) {
    return err;
  }

  err = await isValidPermission(selfUserID, presentationID);
  if (err != null) {
    return err;
  }

  const user = await authModel.get(email);

  err = await isAccountExisted(user.id);
  if (err != null) {
    return err;
  }

  const account_presentation = {
    presentation_id: presentationID,
    account_id: user.id,
    role: ROLE_COLLABORATOR
  };

  // Send email invite
  let url = `${CLIENT_URL}/presentation`;
  await sendMailCollab(email, url);

  await accountPresentationModel.add(account_presentation);
  return {
    ReturnCode: 200,
    Message: "add collaborator successfully"
  };
};

exports.RemoveCollaborator = async (presentationID, userID, selfUserID) => {
  let err = await isAccountPresentationExisted(presentationID, userID);
  if (err != null) {
    return err;
  }

  err = await isValidPermission(selfUserID, presentationID);
  if (err != null) {
    return err;
  }

  const accountPresentation =
    await accountPresentationModel.getByAccountIDAndPresentationID(
      userID,
      presentationID
    );
  await accountPresentationModel.del(accountPresentation.id);
  return {
    ReturnCode: 200,
    Message: "remove collaborator successfully"
  };
};

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
};
