const Recipe = require('../services/recipesService');

const create = async (req, res) => {
    const recipe = req.body;
    const { message, statusCode, newRecipe } = await Recipe.create(recipe);
    if (message) return res.status(statusCode).json({ message });
    console.log(newRecipe);
    return res.status(statusCode).json(newRecipe);
};

module.exports = {
    create,
};
