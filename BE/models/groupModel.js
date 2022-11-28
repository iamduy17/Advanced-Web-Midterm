const db = require('../db');

const tbName = 'group';
module.exports = {
    getByID: async (id) => {
        const res = await db.get(tbName, 'id', id);
        if (res.length > 0) return res[0];
        return null;
    },
    add: async (data) => {
        const res = await db.add(tbName, data);
        return res;
    },
};