const statusCode = 400;
const message = 'Invalid entries. Try again.';

function validateEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) return true;
    return false;
}

const isValid = (name, email, password) => {
    switch (true) {
        case !name || !email || !password: return { statusCode, message };
        case validateEmail(email) !== true: return { statusCode, message };
        default: return {};
    }
};

module.exports = {
    isValid,
    statusCode,
    message,
};
