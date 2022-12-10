const db = require('../db');

const tbName = 'slide';
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
    listPresentationID: async (presentationID) => {
        const res = await db.get(tbName, 'presentation_id', presentationID);
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
    update: async (id, content) => {
        const condition = ` WHERE "id" = ${id} `;
        try {
            const res = await db.patch(tbName, ['content'], content, condition);
            return res;
        } catch (error) {
            return false;
        }
    }
};