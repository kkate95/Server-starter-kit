const pg = require('pg');

let config = {
    host: process.env.PGHOST,
    max: 10,
    idleTimeoutMillis: 30000
};

let pool = new pg.Client(config);

module.exports = {
    init: () =>
        new Promise((resolve, reject) =>
            pool.connect(err => err ? reject(err) : resolve())
        ),

    pool
};