
let generalCodes = {

    ERR_CODE_NOT_SENT:                              'Код не был отправлен',
    ERR_EMAIL_NOT_SENT:                             'Письмо на email не было отправлено',
    ERR_USER_LOGIN:                                 'Неверный логин или пароль',

    ERR_NOT_FOUND:                                  'Не найдено',
    ERR_USER_NOT_FOUND:                             'Пользователь не найден',
    ERR_ROUTE_NOT_FOUND:                            'Маршрут не найден',
    ERR_EMAIL_NOT_FOUND:                            'Email не найден',
    ERR_TOKEN_NOT_FOUND:                            'Токен не найден',

    ERR_ACCESS_TOKEN_EXPIRED:                       'Access token устарел',
    ERR_REFRESH_TOKEN_EXPIRED:                      'Refresh token устарел',
    ERR_TOKEN_EXPIRED:                              'Token устарел',

    ERR_ALREADY_EXIST:                              'Уже существует',
    ERR_EMAIL_ALREADY_EXIST:                        'Пользователь с данным email уже существует',

    ERR_WRONG_FILE_SIZE:                            'Не верный размер файла',
    ERR_WRONG_FILE_TYPE:                            'Не поддерживаемый тип файла',

    ERR_QUERY_FAILED:                               "Ошибка при выполнении запроса к БД",
    ERR_BAD_REQUEST:                                "Неверные данные при запросе",
    ERR_WRONG_LOGIN_OR_PASSWORD:                    "Неверный логин или пароль",
    ERR_WRONG_PASSWORD:                             "Неверный пароль",

    ERR_INTERNAL:                                   "Ошибка на сервере",

    ERR_FORBIDDEN:                                  'Доступ к данному ресурсу запрещен'
};

module.exports = generalCodes;