const db = require("../db");

const tbName = "account";
//const idFieldName = 'email';
module.exports = {
  get: async (email) => {
    const res = await db.get(tbName, "email", email);
    if (res.length > 0) return res[0];
    return null;
  },
  add: async (data) => {
    const res = await db.add(tbName, data);
    return res;
  },
  getUserByProvider: async (email, provider) => {
    const condition = `WHERE "email" = '${email}' and "provider" = '${provider}'`;
    const res = await db.loadCondition(tbName, "email", condition);
    if (res.length > 0) return res[0];
    return null;
  },
  getUserByID: async (id) => {
    const res = await db.get(tbName, "id", id);
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
