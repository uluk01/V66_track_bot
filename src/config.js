const service = PropertiesService.getScriptProperties();
const TG_TOKEN = service.getProperty("BOT_TOKEN");
const WEB_APP_URL = service.getProperty("WEB_APP_URL");
const SPREAD_SHEET_ID = service.getProperty("SPREAD_SHEET_ID");

const config = {
  spreadsheet: SPREAD_SHEET_ID,
  webUrl: WEB_APP_URL,
  tokenTelegram: TG_TOKEN,
  apiUrlTelegram: "https://api.telegram.org/bot",
  sheets: {
    sheetTracking: "Tracking",
    sheetLog: "Log",
  },
  db: {
    id: 1,
    china: 2,
    delivery: 3,
    deliveryDate: 4,
    status: 6,
    comment: 8,
  },
  botCommands: {
    start: "/start",
  },
};
