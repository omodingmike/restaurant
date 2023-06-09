module.exports = {
    isValidPhoneNumber: (phoneNumber) => {
        phoneNumber = phoneNumber.trim().replace(/[ -]/g, "");
        if (/^07\d{8}$/.test(phoneNumber)) {
            return true;
        }
        if (/^\+2567\d{8}$/.test(phoneNumber)) {
            return true;
        }
        return /^2567\d{8}$/.test(phoneNumber);

    },
    isValidNIN: (value) => {
        if (value.trim().length !== 14) {
            return false;
        }
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(value);
    },
    youngerThan10Years: (dob) => {
        try {
            const birthDate = new Date(dob);
            const now = new Date();
            const age = Math.floor((now - birthDate) / 31536000000);
            return age >= 10;
        } catch (e) {
            return false;
        }
    },
    getMongooseValidationErrors: (error) => {
        if (error.name === "ValidationError") {
            let messages = {};
            Object.keys(error.errors).forEach((key) => {
                messages[key] = error.errors[key].message;
            });
            return messages;
        } else {
            return error;
        }
    },
    isValidEmail: (email) => {
        if (email.length === 0) {
            return true;
        }
        //eslint-disable-line
        const regex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return regex.test(email);
    },
    isAlphanumeric: (value) => {
        if (value.length === 0) {
            return false;
        }
        return /^[0-9a-zA-Z]+$/.test(value);
    },
};
