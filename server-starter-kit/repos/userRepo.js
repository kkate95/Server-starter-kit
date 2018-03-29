let { query } = require('../utils/db'),
    sql = require('../sql/userRepo');

module.exports = {

    loginUser: ({email, password}) => {
        let {text, params} = sql.loginUser(email, password);
        return query(text, params);
    },

    checkEmailExists: (email) => {
        let {text, params} = sql.checkEmailExists(email);
        return query(text, params);
    },

    registerUser: ({first_name, last_name, password, email}, reg_token) => {
        let {text, params} = sql.registerUser({first_name, last_name, password, email}, reg_token);
        return query(text, params)
    },

    checkRegToken: (reg_token) => {
        let {text, params} = sql.checkRegToken(reg_token);
        return query(text, params);
    },

    confirmEmail: (user_id) => {
        let {text, params} = sql.confirmEmail(user_id);
        return query(text, params);
    },

    insertRefreshToken: (user_id, refresh_token, refresh_expires_date) => {
        let {text, params} = sql.insertRefreshToken(user_id, refresh_token, refresh_expires_date);
        return query(text, params);
    },

    logoutUser: (refresh_token) => {
        let {text, params} = sql.logoutUser(refresh_token);
        return query(text, params);
    },

    checkUserPassword: (user_id, old_password) => {
        let {text, params} = sql.checkUserPassword(user_id, old_password);
        return query(text, params);
    },

    changePassword: (user_id, new_password) => {
        let {text, params} = sql.changePassword(user_id, new_password);
        return query(text, params);
    },

    checkResfreshToken: ({ refresh_token }) => {
        let {text, params} = sql.checkResfreshToken(refresh_token);
        return query(text, params);
    },

    getUserProfile: (access_token) => {
        let {text, params} = sql.getUserProfile(access_token);
        return query(text, params);
    }
};