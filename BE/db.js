const pgp = require('pg-promise')({
    capSQL: true,
});
const schema = 'public';

// Database local
const cn = {
    user: 'postgres',
    host: 'localhost',
    database: 'registerAdvancedWeb', // điền tên db trên máy của mình vào
    password: '123', // điền password master
    port: 5432,
    max: 30
};

// Database đã được host
// const cn = {
//     user: 'riojylmkeioytl',
//     host: 'ec2-54-209-66-211.compute-1.amazonaws.com',
//     database: 'df6jibc7d4f9', // điền tên db trên máy của mình vào
//     password: 'bb431a3b5f1edb5e95f6a990ddd2aa965826b70faaca32c5315b34a8e4ed6474', // điền password master
//     port: 5432,
//     max: 30,
//     ssl: {
//         require: true,
//         rejectUnauthorized: false,
//     },
// };
const db = pgp(cn);

exports.load = async (tbName, orderBy) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(
        `SELECT * FROM $1 ORDER BY "${orderBy}" ASC `,
        table
    );

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/load: ', error);
    }
};

exports.loadCondition = async (tbName, orderBy, condition) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr =
        pgp.as.format('SELECT * FROM $1', table) +
        condition +
        ` ORDER BY "${orderBy}" ASC`;

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/loadCondition: ', error);
    }
};

exports.get = async (tbName, fieldName, value) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(
        `SELECT * FROM $1 WHERE "${fieldName}"='${value}'`,
        table
    );

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/get: ', error);
    }
};

exports.add = async (tbName, entity) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.helpers.insert(entity, null, table) + ' RETURNING *';

    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log('error db/add: ', error);
    }
};

exports.patch = async (tbName, filedName, entity, condition) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const conditionInput = pgp.as.format(condition, entity);
    const qStr = pgp.helpers.update(entity, filedName, table) + conditionInput;
    
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/patch: ', error);
    }
};


exports.del = async (tbName, condition) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(`DELETE FROM $1 `, table) + condition;

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/del: ', error);
    }
};

exports.count = async (tbName, idFieldName, condition) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr =
        pgp.as.format(
            `SELECT count("${idFieldName}") AS "Size" FROM $1`,
            table
        ) + condition;

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/count: ', error);
    }
};