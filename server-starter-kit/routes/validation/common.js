let Joi = require('joi');

module.exports = {
    password:       Joi.string(),
    email:          Joi.string().email(),
    string:         Joi.string(),
};

