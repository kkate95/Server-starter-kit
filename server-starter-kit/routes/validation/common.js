let Joi = require('joi');

module.exports = {
    password:       Joi.string(),
    email:          Joi.string().email(),
    string:         Joi.string(),
    refresh_token:  Joi.string().regex(/\d+\..+/)
};

