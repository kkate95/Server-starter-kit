
let common = require('./common');

let schema = {
    login : {
        body: {
            login:              common.login.required(),
            password:           common.password.required(),
        }
    }
};

module.exports = schema;
