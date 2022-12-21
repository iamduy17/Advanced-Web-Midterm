const db = require("../db");

const tbName = "account_group";
module.exports = {
  get: async (email) => {
    const res = await db.get(tbName, "email", email);
    if (res.length > 0) return res[0];
    return null;
  },
  getAll: async () => {
    const res = await db.getAll(tbName);
    if (res.length > 0) return res;
    return null;
  },
  add: async (data) => {
    const res = await db.add(tbName, data);
    return res;
  },
  getUserByIDGroup_IdUser: async (group_id, account_id) => {
    const res = await db.getTowCondition(
      tbName,
      "group_id",
      group_id,
      "account_id",
      account_id
    );
    if (res.length > 0) return res[0];
    return null;
  },
  update: async (id, verify) => {
    const condition = ` WHERE "id" = ${id} `;
    try {
      await db.patch(tbName, ["is_activated"], verify, condition);
      return true;
    } catch (error) {
      return false;
    }
  }
};
