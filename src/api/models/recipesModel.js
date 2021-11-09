const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
    const db = await connection();
    const result = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });
    return { recipe: { _id: result.insertedId, name, ingredients, preparation } };
};

const getAll = async () => {
    const db = await connection();
    const result = await db.collection('recipes').find().toArray();
    return result;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return result;
};

const update = async (id, { name, ingredients, preparation }) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();

    await db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return result;
};

const remove = async (id) => {
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const postImage = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const URL = `localhost:3000/src/uploads/${id}.jpeg`;

    const db = await connection();

    await db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { image: URL } });

    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return result;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    postImage,
};
