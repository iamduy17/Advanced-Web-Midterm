const bcrypt = require('bcryptjs');
const groupModel = require('../models/groupModel');
const accountGroupModel = require('../models/accountGroupModel');
const {saltRounds} = require('../config/index');
const { GenerateToken, AuthenticationError, validateEmail } = require("../utils/index");
const sendMail = require('../utils/sendMail');
const {CLIENT_URL} = require('../config/index');
const {hexEncode, hexDecode} = require('../utils/hexToString');


exports.ListGroups = async (user) => {
    const groups = []
    let accountGroups = await accountGroupModel.listByAccountID(user.id);
    for(let i = 0; i < len(accountGroups); i++){
        const group = await groupModel.getByID(accountGroups[i].id);
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