
class BaseError extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status || 500;
        this.name = this.constructor.name;
        this.code = code;
        this.Message = message;
        if (typeof Error.captureStackTrace == 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

module.exports = BaseError;