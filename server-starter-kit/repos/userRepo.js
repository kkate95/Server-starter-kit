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

    insertRefreshToken: (user_id, token) =>
        query(`
            INSERT INTO refresh_tokens(user_id, token) VALUES ($1, $2)
        `, [user_id, token]),

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
            `, [user_id, new_password])

};