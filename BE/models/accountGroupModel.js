const db = require('../db');

const tbName = 'account_group';
module.exports = {
    getByID: async (id) => {
        const res = await db.get(tbName, 'id', id);
        if (res.length > 0) return res[0];
        return null;
    },
    listByAccountID: async (accountID) => {
        const res = await db.get(tbName, 'account_id', accountID);
        if (res.length > 0) return res;
        return null;
    },
};