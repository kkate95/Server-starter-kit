
module.exports = {
    apps: [
        {
            name        : "SERVER_STARTER_KIT",
            script      : "./bin/www",
            exec_mode   : "cluster",
            instances   : 'max',
            env: {
                "PORT": 3000,
                "NODE_ENV": "production",
                "ENV_FILE": "./config/.env",
            },
        }
    ]
};