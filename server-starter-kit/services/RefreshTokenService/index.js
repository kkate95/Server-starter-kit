
let query = require('../../utils/db').query;
let logger = require('../../utils/logger');

module.exports = {
    deleteExpiredRefreshToken: () => {
        const day = 1000 * 60 * 60 * 24;
        setInterval(() => {
            query(` 
                DELETE FROM refresh_tokens
                WHERE now() > expired_at`
            , [])
                .catch(err => logger.error(err))
        }, day)
    }
};

