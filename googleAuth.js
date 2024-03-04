const { google } = require("googleapis");
require("dotenv").config();
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

/**
 * Создает клиента для аутентификации с помощью JWT
 * в сервисах Google.
 * @async
 * @returns {Promise<Object>}  google.auth.JWT instance
 */

const getAuthClient = async () => {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

  const client = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES,
    null
  );

  return client;
};

module.exports = {
  getAuthClient,
};
