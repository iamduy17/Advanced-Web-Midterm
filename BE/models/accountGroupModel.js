const db = require("../db");

const tbName = "account_group";

module.exports = {
  getByID: async (id) => {
    const res = await db.get(tbName, "id", id);
    if (res.length > 0) return res[0];
    return null;
  },
  getByAccountIDAndGroupID: async (accountID, groupID) => {
    const condition = `WHERE "account_id" = ${accountID} and "group_id" = ${groupID}`;
    const res = await db.loadCondition(tbName, "id", condition);
    if (res.length > 0) return res[0];
    return null;
  },
  listByAccountID: async (accountID) => {
    const res = await db.get(tbName, "account_id", accountID);
    if (res.length > 0) return res;
    return null;
  },
  listByGroupID: async (groupID) => {
    const res = await db.get(tbName, "group_id", groupID);
    if (res.length > 0) return res;
    return null;
  },
  add: async (data) => {
    const res = await db.add(tbName, data);
    return res;
  },
  update: async (id, account_group) => {
    const condition = `WHERE "id" = ${id} `;
    try {
      await db.patch(tbName, ["role"], account_group, condition);
      return true;
    } catch (error) {
      return false;
    }
  }
};
