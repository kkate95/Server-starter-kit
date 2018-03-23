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
    },

    confirmEmail: {
        query: {
            token: common.string.required()
        }
    },

    logout: {
        body: {
            refresh_token: common.refresh_token.required()
        }
    },

    change_password: {
        body: {
            old_password: common.password.required(),
            new_password: common.password.required(),
            refresh_token: common.refresh_token.required()
        }
    },

    getAccessToken: {
        body: {
            refresh_token: common.refresh_token.required()
        }
    }

};

module.exports = schema;