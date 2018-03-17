let repo = require('../repos/userRepo'),
    randomstring = require('randomstring'),
    jwt = require('jsonwebtoken'),
    Err = require('../utils/errors');

module.exports = {

    login: (req, res, next) => {
        let access_token, refresh_token, user_id;

        repo.loginUser(req.body)
            .then(data => {
                if (data[0]) {
                    user_id = data[0].id;
                    access_token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET_KEY);
                    refresh_token = `${data[0].id}.${randomstring.generate(60)}`;
                    return repo.insertRefreshToken(data[0].id, refresh_token);
                }

                return Promise.reject(new Err.BadRequest('ERR_WRONG_LOGIN_OR_PASSWORD'));
            })
            .then(() => {
                res.json({user_id, access_token, refresh_token})
            })
            .catch(err => next(err))
    },

    registration: (req, res, next) => {
        let reg_token = randomstring.generate(12);
        let req_body = req.body;

        repo.checkEmailExists(req_body.email)
            .then((result) => {
                if (!result[0]) {
                    return repo.registerUser(req_body, reg_token);
                }

                return Promise.reject(new Err.AlreadyExist('ERR_EMAIL_ALREADY_EXIST'));
            })
            .then(() => {
                res.end()
            })
            .catch(err => next(err))
    }

};