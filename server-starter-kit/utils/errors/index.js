const BaseError = require('./BaseError'),
        Message = require('../../lang/ru');

class NotFoundError extends BaseError {
    constructor(code, msg){
        super(404, code || 'ERR_NOT_FOUND', msg || Message[code ? code : 'ERR_NOT_FOUND']);
    }
}

class BadRequestError extends BaseError {
    constructor(code, msg) {
        super(400, code || 'ERR_BAD_REQUEST', msg || Message[code ? code : 'ERR_BAD_REQUEST']);
    }
}

class InternalError extends BaseError {
    constructor(code, msg) {
        super(500, code || 'ERR_INTERNAL', msg || Message[code ? code : 'ERR_INTERNAL']);
    }
}

class TokenError extends BaseError {
    constructor(code, msg) {
        super(401, code || 'ERR_UNAUTHORIZED', msg || Message[code ? code : 'ERR_UNAUTHORIZED']);
    }
}


module.exports = {
    NotFound: NotFoundError,
    BadRequest: BadRequestError,
    Internal: InternalError,
    Token: TokenError
};