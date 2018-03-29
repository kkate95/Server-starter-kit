# Запуск:
* Сделать git pull
* npm install
* В папке config создать файл .env и заполнить как в примере .env.example
* ENV_FILE=./config/.env npm start

# Запуск pm2 кластера:
1. Запуск dev кластера
`pm2 start ./config/dev.ecosystem.config.js`

2. Запуск prod кластера
`pm2 start ./config/ecosystem.config.js`