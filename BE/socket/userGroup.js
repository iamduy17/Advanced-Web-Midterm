const account_groupModel = require("../models/account_groupModel");

module.exports = {
    userGroup: async (group_id) => {
        const res = await account_groupModel.getByGroupID(group_id);

        io.sockets.broadcast.emit("userGroup", res);
    }
}