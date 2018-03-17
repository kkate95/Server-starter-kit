let repo = require('../repos/userRepo'),
    randomstring = require('randomstring'),
    jwt = require('jsonwebtoken'),
    Err = require('../utils/errors'),
    MessageService = require('../utils/SendMessage');

module.exports = {

    login: (req, res, next) => {
        let access_token, refresh_token, user_id;

        repo.loginUser(req.body)
            .then(data => {
                if (data[0]) {
                    user_id = data[0].id;
                    access_token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME });
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
        let reg_token = randomstring.generate(60);
        let req_body = req.body;

        repo.checkEmailExists(req_body.email)
            .then((result) => {
                if (!result[0]) {
                    return repo.registerUser(req_body, reg_token);
                }

                return Promise.reject(new Err.AlreadyExist('ERR_EMAIL_ALREADY_EXIST'));
            })
            .then(() => {
                return MessageService.sendConfirmEmail(req_body.email, reg_token);
            })
            .then(() => {
                res.end()
            })
            .catch(err => next(err))
    },

    logout: (req, res, next) => {
        repo.logoutUser(req.body.refresh_token)
            .then(() => res.end() )
            .catch(err => next(err))
    },

    changePassword: (req, res, next) => {
        let req_body = req.body;
        let user_id = parseInt(req_body.refresh_token.split('.')[0], 10);

        repo.checkUserPassword(user_id, req_body.old_password)
            .then(result => {
                if (result[0]) {
                    return repo.changePassword(user_id, req_body.new_password)
                }
                return Promise.reject(new Err.BadRequest('ERR_WRONG_PASSWORD'));
            })
            .then(() => {
                res.end()
            })
            .catch(err => next(err))

    }

};