const groupModel = require('../models/groupModel');
const accountGroupModel = require('../models/accountGroupModel');
const authModel = require('../models/authModel');

const ROLE_OWNER = 1;

exports.ListGroups = async (user) => {
    const groups = []
    let accountGroups = await accountGroupModel.listByAccountID(user.id);
    if (!accountGroups){
        return {
            ReturnCode: 200,
            Message: "list group successfully",
            Groups: groups
        };
    }
    for (let i = 0; i < accountGroups.length; i++) {
        const group = await groupModel.getByID(accountGroups[i].group_id);
        console.log({ group })
        groups.push({
            id: group.id,
            className: group.name,
            section: group.description,
        })
    }

    return {
        ReturnCode: 200,
        Message: "list group successfully",
        Groups: groups
    };
}

exports.GetGroup = async (id) => {
    const owners = [];
    const coOwners = [];
    const members = [];
    const group = await groupModel.getByID(id);
    if(!group){
        return {
            ReturnCode: 404,
            Message: "group not found",
            Data:{}
        };
    }
    let accountGroups = await accountGroupModel.listByGroupID(id);
    for (let i = 0; i < accountGroups.length; i++) {
        const account = await authModel.getUserByID(accountGroups[i].account_id);
        const {id, username} = account;
        switch (accountGroups[i].role) {
            case 1:
                owners.push({id, username});
                break;
            case 2:
                coOwners.push({id, username});
                break;
            case 3:
                members.push({id, username});
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
}

exports.CreateGroup = async (group, userID) => {
    const groupResponse = await groupModel.add(group);
    const account_group = {
        group_id: groupResponse.id,
        account_id: userID,
        role: ROLE_OWNER
    }
    await accountGroupModel.add(account_group)
    return {
        ReturnCode: 200,
        Message: "create group successfully",
        Data: {
            Group: groupResponse,
        }
    };
}

exports.SetRole = async (groupID, userID, role) => {
    const accountGroupResponse = await accountGroupModel.getByAccountIDAndGroupID(userID, groupID);
    const account_group = {
        id: accountGroupResponse.id,
        account_id: userID,
        groupID: groupID,
        role: role
    }
    await accountGroupModel.update(accountGroupResponse.id, account_group)
    return {
        ReturnCode: 200,
        Message: "change role successfully",
    };
}