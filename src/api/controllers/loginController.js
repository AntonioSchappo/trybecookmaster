const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const { isValid, statusCode, messages } = require('../schemas/loginSchema');

const secret = process.env.SECRET || 'somethingForTheEvaluator';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const logUser = async (req, res) => {
const { email, password } = req.body;

const { message } = isValid(email, password);

if (message) {
    return res.status(statusCode).json({ message });
}

const user = await User.findByEmail(email);

if (!user || user.password !== password) {
    return res.status(statusCode).json({ message: messages.nv });
}

const token = jwt.sign({ data: user }, secret, jwtConfig);

res.status(200).json({ token });
};

module.exports = {
    logUser,
};
