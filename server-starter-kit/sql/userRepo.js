
module.exports = {
    loginUser: (email, password) => ({
        text: `
            SELECT *
            FROM users
            WHERE email = $1 AND password = crpt.crypt($2, password) AND is_confirmed = true
        `,
        params: [email, password]
    }),

    checkEmailExists: (email) => ({
        text: `
            SELECT id 
            FROM users 
            WHERE email = $1
        `,
        params: [email]
    }),

    registerUser: ({first_name, last_name, password, email}, reg_token) => ({
        text: `
            INSERT INTO users(first_name, last_name, password, email, reg_token)
            VALUES($1, $2,  crpt.crypt($3, crpt.gen_salt('bf')), $4, $5)
        `,
        params: [first_name, last_name, password, email, reg_token]
    }),

    checkRegToken: (reg_token) => ({
        text: `
            SELECT id
            FROM users
            WHERE reg_token = $1
        `,
        params: [reg_token]
    }),

    confirmEmail: (user_id) => ({
        text:  `
            UPDATE users
            SET
                is_confirmed = true, reg_token = 'EXPIRED'
            WHERE id = $1
        `,
        params: [user_id]
    }),

    insertRefreshToken: (user_id, refresh_token, refresh_expires_date) => ({
        text: `
            INSERT INTO refresh_tokens(user_id, token, expired_at) 
            VALUES ($1, $2, $3)
        `,
        params: [user_id, refresh_token, refresh_expires_date]
    }),

    logoutUser: (refresh_token) => ({
        text: `
            DELETE FROM refresh_tokens WHERE token = $1
        `,
        params: [refresh_token]
    }),

    checkUserPassword: (user_id, old_password) => ({
        text: `
            SELECT id
            FROM users
            WHERE id = $1 AND password = crpt.crypt($2, password)
        `,
        params: [user_id, old_password]
    }),

    changePassword: (user_id, new_password) => ({
        text: `
           UPDATE users 
           SET 
                password = crpt.crypt($2, crpt.gen_salt('bf'))
           WHERE id = $1
        `,
        params: [user_id, new_password]
    }),

    checkResfreshToken: (refresh_token) => ({
        text: `
            SELECT user_id
            FROM refresh_tokens
            WHERE refresh_token = $1 and expired_at >= now()
        `,
        params: [refresh_token]
    }),

    getUserProfile: (access_token) => ({
        text: `
            SELECT id, first_name, last_name, email
            FROM users
            WHERE id = $1
        `,
        params: [access_token]
    })
};