const User = require('../models/usersModel');

const { isValid } = require('../schemas/userSchema');

const create = async ({ name, email, password }) => {
    const userExists = await User.findByEmail(email);

    if (userExists) {
        return { statusCode: 409, message: 'Email already registered' };
    }

    const validations = isValid(name, email, password);

    if (validations.message) return validations;

    const newUser = await User.create(name, email, password);

    return { statusCode: 201, newUser };
};

module.exports = {
    create,
};
