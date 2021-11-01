const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const statusCode = 401;

const messages = {
    nf: 'All fields must be filled',
    nv: 'Incorrect username or password',
    jwt: 'jwt malformed' };

const secret = process.env.SECRET || 'somethingForTheEvaluator';

const isValid = (email, password) => {
    if (!email || !password) return { message: messages.nf };

    return {};
};

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(statusCode).json({ message: messages.jwt });
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findByEmail(decoded.data.email);
        if (!user) return res.status(statusCode).json({ message: messages.jwt });
        req.user = user;
        next();
    } catch (err) {
       return res.status(statusCode).json({ message: err.message });
   }
};

module.exports = {
    isValid,
    statusCode,
    messages,
    secret,
    validateJWT,
};