let Joi = require('joi');

module.exports = {

    login: Joi.string(),
    password: Joi.string()

};

