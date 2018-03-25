
module.exports = {
    apps: [
        {
            name        : "SERVER_STARTER_KIT_DEV",
            script      : "./bin/www",
            exec_mode   : "cluster",
            instances   : 2,
            env: {
                "PORT": 3000,
                "NODE_ENV": "development",
                "ENV_FILE": "./config/.env",
            },
        },
        {
            name        : "REFRESH_TOKEN_SERVICE_DEV",
            script      : "./bin/refreshTokens.js",
            exec_mode   : "fork",
            env: {
                "NODE_ENV": "development",
                "ENV_FILE": "./config/.env"
            },
        },
    ]
};