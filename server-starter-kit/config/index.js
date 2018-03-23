
module.exports = {

    emailSettings: {
        host: process.env.SUPPORT_EMAIL_HOST,
        port: process.env.SUPPORT_EMAIL_PORT,
        auth: {
            user: process.env.SUPPORT_EMAIL_USERNAME,
            pass: process.env.SUPPORT_EMAIL_PASSWORD
        }
    },

    defaultLanguage: 'en'

};