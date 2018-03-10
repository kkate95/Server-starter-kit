let bunyan = require('bunyan');

let log = bunyan.createLogger({
    name: "myapp",
    streams: [
        {
            path: 'logs/logs.txt'
        },
        {
            stream: process.stdout
        },
    ]
});
/*
module.exports = {
  logError: (args) => log.error("ERROR", args)
};*/


log.info("bla bla")
