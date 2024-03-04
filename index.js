require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const { google } = require("googleapis");
const { getAuthClient } = require("./googleAuth");

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});

const getApiClient = async () => {
  const authClient = await getAuthClient();
  const { spreadsheets: apiClient } = google.sheets({
    version: "v4",
    auth: authClient,
  });

  return apiClient;
};

const getValuesData = async (apiClient, range) => {
  const { data } = await apiClient.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    ranges: range,
    fields: "sheets",
    includeGridData: true,
  });

  return data.sheets;
};

const findRowIndex = (sheet, code) => {
  const rowIndex = sheet.data[0].rowData.findIndex(
    (item) => item.values[0].formattedValue === code
  );

  return rowIndex;
};

bot.onText(/^(YT|JT)?\d{13}$|^\d{15}$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[0];

  const range = "Лист1";
  const apiClient = await getApiClient();
  const [sheet] = await getValuesData(apiClient, range);
  const rowIndex = findRowIndex(sheet, resp);

  const list = sheet.data[0].rowData[rowIndex].values;

  bot.sendMessage(
    chatId,
    `Code: ${list[0]?.formattedValue}\nDate: ${list[1]?.formattedValue}\nDelivery date: ${list[2]?.formattedValue}\nBranch: ${list[3]?.formattedValue}\nStatus: ${list[4]?.formattedValue}`
  );
});

bot.on("polling_error", (err) => console.log(err));

bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendMessage(msg.chat.id, "Привет! Я бот по работе с гугл табличкой!.");
});
