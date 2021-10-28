const User = require('../services/usersService');

const create = async (req, res) => {
    const user = req.body;
    const { statusCode, message, newUser } = await User.create(user);
    if (message) return res.status(statusCode).json({ message });
    return res.status(statusCode).json(newUser);
};

module.exports = {
    create,
};
