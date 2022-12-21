const db = require("../db");

const tbName = "slide_type";
module.exports = {
  getByID: async (id) => {
    const res = await db.get(tbName, "id", id);
    if (res.length > 0) return res[0];
    return null;
  }
};
