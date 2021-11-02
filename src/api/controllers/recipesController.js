const Recipe = require('../services/recipesService');

const create = async (req, res) => {
    const recipe = req.body;
    const { _id } = req.user;
    const userId = _id;
    const { message, statusCode, newRecipe } = await Recipe.create(recipe, userId);
    if (message) return res.status(statusCode).json({ message });
    return res.status(statusCode).json(newRecipe);
};

const getAll = async (_req, res) => {
    const result = await Recipe.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const {
        message, statusCode, _id, name, ingredients, preparation, userId,
    } = await Recipe.getById(id);
    if (message) return res.status(statusCode).json({ message });
    return res.status(200).json({ _id, name, ingredients, preparation, userId });
};

const update = async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;
    const updatedRecipe = await Recipe.update(id, recipe);
    return res.status(200).json(updatedRecipe);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
};
