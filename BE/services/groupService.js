const groupModel = require("../models/groupModel");
const accountGroupModel = require("../models/accountGroupModel");
const authModel = require("../models/authModel");
const presentationModel = require("../models/presentationModel");
const presentationService = require("./presentationService");

const ROLE_OWNER = 1;
const ROLE_COOWNER = 2;
const ROLE_MEMBER = 3;

exports.ListGroups = async (user) => {
  const groups = [];
  let accountGroups = await accountGroupModel.listByAccountID(user.id);
  if (!accountGroups) {
    return {
      ReturnCode: 200,
      Message: "list group successfully",
      Groups: groups
    };
  }
  for (let i = 0; i < accountGroups.length; i++) {
    const group = await groupModel.getByID(accountGroups[i].group_id);
    console.log({ group });
    groups.push({
      id: group.id,
      className: group.name,
      section: group.description
    });
  }

  return {
    ReturnCode: 200,
    Message: "list group successfully",
    Groups: groups
  };
};

exports.GetGroup = async (id) => {
  const owners = [];
  const coOwners = [];
  const members = [];
  const group = await groupModel.getByID(id);
  if (!group) {
    return {
      ReturnCode: 404,
      Message: "group not found",
      Data: {}
    };
  }
  let accountGroups = await accountGroupModel.listByGroupID(id);
  for (let i = 0; i < accountGroups.length; i++) {
    const account = await authModel.getUserByID(accountGroups[i].account_id);
    const { id, username } = account;
    switch (accountGroups[i].role) {
      case ROLE_OWNER:
        owners.push({ id, username });
        break;
      case ROLE_COOWNER:
        coOwners.push({ id, username });
        break;
      case ROLE_MEMBER:
        members.push({ id, username });
        break;
    }
  }

  return {
    ReturnCode: 200,
    Message: "get group successfully",
    Data: {
      Group: group,
      Owners: owners,
      CoOwners: coOwners,
      Members: members
    }
  };
};

exports.CreateGroup = async (group, userID) => {
  const groupResponse = await groupModel.add(group);
  const account_group = {
    group_id: groupResponse.id,
    account_id: userID,
    role: ROLE_OWNER
  };
  await accountGroupModel.add(account_group);
  return {
    ReturnCode: 200,
    Message: "create group successfully",
    Data: {
      Group: groupResponse
    }
  };
};

const isValidRole = async (groupID, userID, roles) => {
  const accountGroupResponse = await accountGroupModel.getByAccountIDAndGroupID(
    userID,
    groupID
  );
  if (!accountGroupResponse) {
    return {
      ReturnCode: 401,
      Message: "invalid permission"
    };
  }
  for (let i = 0; i < roles.length; i++) {
    if (roles[i] === accountGroupResponse.role) {
      return null;
    }
  }
  return {
    ReturnCode: 401,
    Message: "invalid permission"
  };
};

const isAccountGroupExisted = async (groupID, userID) => {
  const accountGroupResponse = await accountGroupModel.getByAccountIDAndGroupID(
    userID,
    groupID
  );
  if (!accountGroupResponse) {
    return {
      ReturnCode: 404,
      Message: "user not in this group"
    };
  }
  return null;
};

exports.SetRole = async (groupID, userID, role, selfUserID) => {
  if (role === ROLE_OWNER) {
    return {
      ReturnCode: 403,
      Message: "can't promote to owner"
    };
  }

  let err = await isAccountGroupExisted(groupID, userID);
  if (err != null) {
    return err;
  }

  err = await isValidRole(groupID, selfUserID, [ROLE_OWNER]);
  if (err != null) {
    return err;
  }

  const accountGroupResponse = await accountGroupModel.getByAccountIDAndGroupID(
    userID,
    groupID
  );

  const account_group = {
    id: accountGroupResponse.id,
    account_id: userID,
    groupID: groupID,
    role: role
  };
  await accountGroupModel.update(accountGroupResponse.id, account_group);
  return {
    ReturnCode: 200,
    Message: "change role successfully"
  };
};

exports.RemoveMember = async (groupID, userID, selfUserID) => {
  let err = await isAccountGroupExisted(groupID, userID);
  if (err != null) {
    return err;
  }

  err = await isValidRole(groupID, selfUserID, [ROLE_OWNER, ROLE_COOWNER]);
  if (err != null) {
    return err;
  }

  err = await isValidRole(groupID, userID, [ROLE_MEMBER]);
  if (err != null) {
    return err;
  }

  const accountGroupResponse = await accountGroupModel.getByAccountIDAndGroupID(
    userID,
    groupID
  );

  await accountGroupModel.del(accountGroupResponse.id);
  return {
    ReturnCode: 200,
    Message: "remove member successfully"
  };
};

exports.RemoveGroup = async (groupID, userID) => {
  let err = await isValidRole(groupID, userID, [ROLE_OWNER]);
  if (err != null) {
    return err;
  }

  const accountGroups = await accountGroupModel.listByGroupID(groupID);
  if (accountGroups) {
    for (let i = 0; i < accountGroups.length; i++) {
      accountGroupModel.del(accountGroups[i].id);
    }
  }

  const presentations = await presentationModel.listByGroupID(groupID);
  if (presentations) {
    for (let i = 0; i < presentations.length; i++) {
      presentationService.DeletePresentation(userID, presentations[i].id);
    }
  }

  await groupModel.del(groupID);
  return {
    ReturnCode: 200,
    Message: "remove group successfully"
  };
};

exports.IsInGroup = async (groupID, userID) => {
  const account_group = await accountGroupModel.getByAccountIDAndGroupID(userID, groupID);
  return {
    ReturnCode: 200,
    Message: "get is in group successfully",
    Data: account_group !== null
  };
};
