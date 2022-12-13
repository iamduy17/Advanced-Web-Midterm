const db = require('../db');

const tbName = 'presentation';
module.exports = {
    getByID: async (id) => {
        const condition = `WHERE "id" = '${id}' and "is_deleted" = false`;
        const res = await db.loadCondition(tbName, 'id', condition);
        if (res.length > 0) return res[0];
        return null;
    },
    add: async (data) => {
        const res = await db.add(tbName, data);
        return res;
    },
    listByOwnerID: async (ownerID) => {
        const condition = `WHERE "owner_id" = '${ownerID}' and "is_deleted" = false`;
        const res = await db.loadCondition(tbName, 'id', condition);
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
            const res = await db.patch(tbName, ['name', 'updated_at'], name, condition);
            return res;
        } catch (error) {
            return false;
        }
    },
    updateSlideCount: async (id, slideCount) => {
        const condition = ` WHERE "id" = ${id} `;
        try {
            const res = await db.patch(tbName, ['slide_count'], slideCount, condition);
            return res;
        } catch (error) {
            return false;
        }
    }
};