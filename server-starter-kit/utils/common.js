let jwt = require('jsonwebtoken'),
    Err = require('./errors'),
    passport = require('passport');

module.exports = {

    getDataFromAccessToken: (accessToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return reject(new Err.Token('ERR_ACCESS_TOKEN_EXPIRED'))
                }
                resolve(decoded);
            })
        })
    },

    generateAccessToken: (user_id) => {
        return jwt.sign(
            {id: user_id},
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
        );
    },

    authBearer: passport.authenticate('bearer', { session: false })

};