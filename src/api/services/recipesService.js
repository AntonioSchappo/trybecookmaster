const Recipe = require('../models/recipesModel');

const { message, statusCode } = require('../schemas/userSchema');

const create = async ({ name, ingredients, preparation }, userId) => {
    if (!name || !ingredients || !preparation) {
        return { statusCode, message };
    }
    const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
    return { statusCode: 201, newRecipe };
};

const getAll = async () => {
    const result = await Recipe.getAll();
    return result;
};

const getById = async (id) => {
    const result = await Recipe.getById(id);
    if (!result) return { statusCode: 404, message: 'recipe not found' };
    return result;
};

const update = async (id, recipe) => {
    const result = await Recipe.update(id, recipe);
    return result;
};

const remove = async (id) => {
    await Recipe.remove(id);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};
