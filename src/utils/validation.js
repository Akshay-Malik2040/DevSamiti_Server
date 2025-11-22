const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password}=req.body;
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("Missing Fields");
    }

    if (firstName.length > 50 || lastName.length > 50) {
        throw new Error("Name length should be under 50");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Enter valid EmailId");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Please Try a strong Password");
    }
};

module.exports = { validateSignUpData }