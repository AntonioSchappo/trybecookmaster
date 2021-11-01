const connection = require('./connection');

const create = async (name, ingredients, preparation) => {
    const db = await connection();
    const result = await db.collection('recipes').insertOne({ name, ingredients, preparation });
    return { recipe: { _id: result.insertedId, name, ingredients, preparation } };
};

const getAll = async () => {
    const db = await connection();
    const result = await db.collection('recipes').find().toArray();
    return result;
};

module.exports = {
    create,
    getAll,
};
