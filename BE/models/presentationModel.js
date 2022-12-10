const db = require('../db');

const tbName = 'presentation';
module.exports = {
    getByID: async (id) => {
        const res = await db.get(tbName, 'id', id);
        if (res.length > 0) return res[0];
        return null;
    },
    listByOwnerID: async (ownerID) => {
        const res = await db.get(tbName, 'owner_id', ownerID);
        if (res.length > 0) return res;
        return null;
    },
    delete: async (id, is_deleted) => {
        const condition = ` WHERE "id" = ${id} `;
        try {
            const res = await db.patch(tbName, ['is_deleted'], is_deleted, condition);
            return res;
        } catch (error) {
            return false;
        }
    },
    update: async (id, name) => {
        const condition = ` WHERE "id" = ${id} `;
        try {
            const res = await db.patch(tbName, ['name'], name, condition);
            return res;
        } catch (error) {
            return false;
        }
    }
};