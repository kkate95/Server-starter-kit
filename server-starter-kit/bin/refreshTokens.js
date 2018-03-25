
require('dotenv').config({ path: process.env.ENV_FILE, silent: 'true' });

let logger = require('../utils/logger'),
    db = require('../utils/db'),
    RefreshTokenService = require('../services/RefreshTokenService');

db.init()
    .then(() => {
        RefreshTokenService.deleteExpiredRefreshToken();
        logger.info('RefreshTokenService is running');
    })
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });