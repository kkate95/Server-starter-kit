let { query } = require('../utils/db');

module.exports = {

    loginUser: ({email, password}) =>
        query(`
            SELECT *
            FROM users
            WHERE email = $1 AND password = crpt.crypt($2, password)
        `, [email, password]),

    checkEmailExists: (email) =>
        query(`SELECT id FROM users WHERE email = $1`, [email]),

    registerUser: ({first_name, last_name, password, email}, reg_token) =>
        query(`
            INSERT INTO users(first_name, last_name, password, email, reg_token)
            VALUES($1, $2,  crpt.crypt($3, crpt.gen_salt('bf')), $4, $5)
         `, [first_name, last_name, password, email, reg_token]),

    insertRefreshToken: (user_id, refresh_token, refresh_expires_date) =>
        query(`
            INSERT INTO refresh_tokens(user_id, token, expired_at) VALUES ($1, $2, $3)
        `, [user_id, refresh_token, refresh_expires_date]),

    logoutUser: (refresh_token) =>
        query(
            `DELETE FROM refresh_tokens WHERE token = $1`, [refresh_token]
        ),

    checkUserPassword: (user_id, old_password) =>
        query(
            `SELECT id
             FROM users
             WHERE id = $1 AND password = crpt.crypt($2, password)
            `, [user_id, old_password]
        ),

    changePassword: (user_id, new_password) =>
        query(`UPDATE users 
                SET password = crpt.crypt($2, crpt.gen_salt('bf'))
                WHERE id = $1
            `, [user_id, new_password]),

    checkResfreshToken: ({ refresh_token }) =>
        query(`
            SELECT user_id
            FROM refresh_tokens
            WHERE refresh_token = $1 and expired_at >= now()
        `, [refresh_token]),

    getUserProfile: (access_token) =>
        query(`
            SELECT id, first_name, last_name, email
            FROM users
            WHERE id = $1
        `, [access_token])

};