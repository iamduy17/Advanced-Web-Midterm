const db = require("../db");

const tbName = "slide";
module.exports = {
  getAllByID: async (id) => {
    const condition = `WHERE "presentation_id" = '${id}' and "is_deleted" = false`;
    const res = await db.loadCondition(tbName, "id", condition);
    if (res.length > 0) return res;
    return null;
  },
  getByID: async (id) => {
    const condition = `WHERE "id" = '${id}' and "is_deleted" = false`;
    const res = await db.loadCondition(tbName, "id", condition);
    if (res.length > 0) return res[0];
    return null;
  },
  add: async (data) => {
    const res = await db.add(tbName, data);
    return res;
  },
  listByPresentationID: async (presentationID) => {
    const condition = `WHERE "presentation_id" = '${presentationID}' and "is_deleted" = false`;
    const res = await db.loadCondition(tbName, "id", condition);
    if (res.length > 0) return res;
    return null;
  },
  delete: async (id, is_deleted) => {
    const condition = ` WHERE "id" = ${id} `;
    try {
      const res = await db.patch(tbName, ["is_deleted"], is_deleted, condition);
      return res;
    } catch (error) {
      return false;
    }
  },
  update: async (id, content) => {
    const condition = ` WHERE "id" = ${id} `;
    try {
      const res = await db.patch(tbName, ["content"], content, condition);
      return res;
    } catch (error) {
      return false;
    }
  }
};
