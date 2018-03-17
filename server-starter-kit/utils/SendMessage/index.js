const nodeMailer = require('nodemailer'),
    Err = require('../errors'),
    smtpTransport = require('nodemailer-smtp-transport'),
    emailSettings = require('../../config').emailSettings,
    logger = require('../logger');

const transporter = nodeMailer.createTransport(smtpTransport(emailSettings));

class MessageService {

    static sendConfirmEmail(email, reg_token) {
        const url = `${process.env.CHECK_EMAIL_HOST}?token=${reg_token}`;
        const html = `<p>Подтвердите адрес вашей электронной почты</p><a href=${url}>Ссылка</a>`;

        const content = {
            from:       `${process.env.SERVICE_NAME} <${emailSettings.auth.user}>`,
            to:         email,
            subject:    'Подтвердите email',
            html:       html
        };

        return transporter.sendMail(content)
            .catch(err => {
                logger.error(err);
                return sendEmailNotSendErr('ERR_EMAIL_NOT_SENT')
            });
    }

}

function sendEmailNotSendErr(code, msg, status) {
    return Promise.reject(new Err.BadRequest(code, msg, status))
}

module.exports = MessageService;