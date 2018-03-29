let repo = require('../repos/userRepo'),
    randomstring = require('randomstring'),
    Err = require('../utils/errors'),
    MessageService = require('../utils/SendMessage'),
    moment = require('moment'),
    commonUtil = require('../utils/common');

module.exports = {

    login: (req, res, next) => {
        let access_token, refresh_token, user_id, refresh_expires_date;

        repo.loginUser(req.body)
            .then(data => {
                if (data[0]) {
                    user_id = data[0].id;
                    access_token = commonUtil.generateAccessToken(user_id);
                    refresh_expires_date = moment().add(process.env.RESRESH_TOKEN_LIFETIME, 'years').format();
                    refresh_token = `${data[0].id}.${randomstring.generate(60)}`;
                    return repo.insertRefreshToken(data[0].id, refresh_token, refresh_expires_date);
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

    confirmEmail: (req, res, next) => {
        repo.checkRegToken(req.query.token)
            .then(result => {
                if (result[0]) {
                    return repo.confirmEmail(result[0].id)
                        .then(() => true)
                }
                return false
            })
            .then(isUserConfirmed => {
                if (isUserConfirmed) {
                    return res.render(
                        'confirmEmail',
                        {title: 'Подтверждение email', confirm_text: 'Email подтверждён'}
                    )
                }
                res.render(
                    'confirmEmail',
                    {title: 'Подтверждение email', confirm_text: 'Ссылка устарела'}
                )
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
        let user_id = parseInt(req.user.id, 10);

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
    },

    getAccessToken: (req, res, next) => {
        let access_token;
        repo.checkResfreshToken(req.body)
            .then((result) => {
                if (result[0]) {
                    let user_id = result[0].user_id;
                    return access_token = commonUtil.generateAccessToken(user_id);
                }
                return Promise.reject(new Err.Token('ERR_REFRESH_TOKEN_EXPIRED'));
            })
            .then(access_token => {
                res.json({access_token})
            })
            .catch(err => next(err));
    },

    getUserProfile: (req, res, next) => {
        repo.getUserProfile(req.user.id)
            .then(result => {
                if (result[0]) {
                    return res.json(result[0])
                }
                return Promise.reject(new Err.NotFound('ERR_USER_NOT_FOUND'))
            })
            .catch(err => next(err))
    }

};