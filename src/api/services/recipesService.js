const Recipe = require('../models/recipesModel');

const { message, statusCode } = require('../schemas/userSchema');

const create = async ({ name, ingredients, preparation }) => {
    if (!name || !ingredients || !preparation) {
        return { statusCode, message };
    }
    const newRecipe = await Recipe.create(name, ingredients, preparation);
    return { statusCode: 201, newRecipe };
};

module.exports = {
    create,
};
