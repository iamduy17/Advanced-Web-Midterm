const db = require("../db");

const tbName = "account_presentation";

module.exports = {
  getByID: async (id) => {
    const res = await db.get(tbName, "id", id);
    if (res.length > 0) return res[0];
    return null;
  },
  listByAccountID: async (accountID) => {
    const res = await db.get(tbName, "account_id", accountID);
    if (res.length > 0) return res;
    return null;
  },
  listByPresentationID: async (presentationID) => {
    const res = await db.get(tbName, "presentation_id", presentationID);
    if (res.length > 0) return res;
    return null;
  },
  getByAccountIDAndPresentationID: async (accountID, presentationID) => {
    const condition = `WHERE "account_id" = ${accountID} and "presentation_id" = ${presentationID}`;
    const res = await db.loadCondition(tbName, "id", condition);
    if (res.length > 0) return res[0];
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
  },
  del: async (id) => {
    const condition = `WHERE "id" = ${id}`;
    const res = await db.del(tbName, condition);
    return res;
  }
};
