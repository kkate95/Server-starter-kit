let common = require('./common');

let schema = {
    login : {
        body: {
            email:        common.email.required(),
            password:     common.password.required(),
        }
    },

    registration : {
        body: {
            email:        common.email.required(),
            last_name :   common.string.required(),
            first_name :  common.string.required()
        }
    }

};

module.exports = schema;