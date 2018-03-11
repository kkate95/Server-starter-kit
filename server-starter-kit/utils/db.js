const pg = require('pg');


let config = {
    host: process.env.PGHOST,
    max: 10,
    idleTimeoutMillis: 30000
};

let db = {};
let pool = new pg.Client(config);


db.init = () =>
    new Promise((resolve, reject) =>
        pool.connect(err => err ? reject(err) : resolve())
    );


const query = (queryStr, args = []) => {
    return new Promise((resolve, reject) => {
        pool.query(queryStr, args, function(err, res) {
            if (err) {
                reject(err);
            }

            resolve(res ? res.rows: '');
        });
    });

};

db.query = query;

module.exports = db;