// Error codes
const AUTH_ERROR_CODE = 401;
const BAD_REQUEST_ERROR_CODE = 400;
const CONFLICT_ERROR_CODE = 409;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const SERVER_ERROR_CODE = 500;

// Movies errors texts
const INVALID_MOVIE_DATA_TEXT = 'Переданы некорректные данные фильма';
const MOVIE_NOT_FOUND_TEXT = 'Такого фильма нет в базе';
const FORBIDDEN_MOVIE_TEXT = 'Доступ к чужому фильму запрещен';

// User errors texts
const INVALID_USER_DATA_TEXT = 'Переданы некорректные данные пользователя';
const USER_NOT_FOUND_TEXT = 'Такого пользователя нет в базе';
const USER_CONFICT_TEXT = 'Пользователь с подобными данными уже существует';

// Models errors
const INVALID_URL_FORMAT_TEXT = 'Неправильный формат ссылки';
const INVALID_USER_MAIL_TEXT = 'Неправильный формат почты';
const INVALID_USER_AUTH_ERROR_TEXT = 'Неправильные почта или пароль';

// Other errors
const AUTH_ERROR_TEXT = 'Требуется авторизация';
const SERVER_ERROR_TEXT = 'Ошибка сервера';
const PAGE_NOT_FOUND_ERROR_TEXT = 'Страница не найдена';
const LIMIT_ERROR_TEXT = 'Превышено количество запросов';

module.exports = {
  AUTH_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
  INVALID_MOVIE_DATA_TEXT,
  MOVIE_NOT_FOUND_TEXT,
  FORBIDDEN_MOVIE_TEXT,
  INVALID_USER_DATA_TEXT,
  USER_NOT_FOUND_TEXT,
  USER_CONFICT_TEXT,
  AUTH_ERROR_TEXT,
  SERVER_ERROR_TEXT,
  INVALID_URL_FORMAT_TEXT,
  INVALID_USER_MAIL_TEXT,
  INVALID_USER_AUTH_ERROR_TEXT,
  PAGE_NOT_FOUND_ERROR_TEXT,
  LIMIT_ERROR_TEXT,
};
