function sendMessage(chat_id, textMessage, keyboard) {
  const options = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: textMessage,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: JSON.stringify(keyboard),
    },
  };
  UrlFetchApp.fetch(
    config.apiUrlTelegram + config.tokenTelegram + "/",
    options
  );
}

function deleteMessage(chat_id, message_id) {
  const options = {
    method: "post",
    payload: {
      method: "deleteMessage",
      chat_id: String(chat_id),
      message_id: message_id,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    },
  };
  UrlFetchApp.fetch(
    config.apiUrlTelegram + config.tokenTelegram + "/",
    options
  );
}

function toastMessage(cbqId, toastText) {
  const options = {
    method: "post",
    payload: {
      callback_query_id: cbqId,
      show_alert: false,
      method: "answerCallbackQuery",
      text: toastText,
      parse_mode: "HTML",
    },
  };
  UrlFetchApp.fetch(
    config.apiUrlTelegram + config.tokenTelegram + "/",
    options
  );
}

function getRowByID(sheet, code, range_ = "A1:A") {
  const range = sheet.getRange(range_);
  const result = range.createTextFinder(code).matchEntireCell(true).findNext();
  return result ? result.getRow() : null;
}
