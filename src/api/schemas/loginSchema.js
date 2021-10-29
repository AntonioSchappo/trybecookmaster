const statusCode = 401;
const messages = { nf: 'All fields must be filled', nv: 'Incorrect username or password' };

const isValid = (email, password) => {
    if (!email || !password) return { message: messages.nf };

    return {};
};

module.exports = {
    isValid,
    statusCode,
    messages,
};