const connection = require('./connection');

const create = async (name, email, password) => {
    const db = await connection();
    const role = 'user';
    const result = await db.collection('users').insertOne({ name, email, password, role });
    return { user: { _id: result.insertedId, name, email, role } };
};

const findByEmail = async (email) => {
    const user = await connection()
        .then((db) => db.collection('users').findOne({ email }));
    if (!user) return null;
    return user;
};

module.exports = {
    create,
    findByEmail,
};
