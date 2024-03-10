function doPost(e) {
  const ctx = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(config.spreadsheet);
  const sheetLog = ss.getSheetByName(config.sheets.sheetLog);

  if (ctx.hasOwnProperty("message")) {
    const ctxMessage = ctx.message;
    if (
      ctxMessage.hasOwnProperty("entities") &&
      ctxMessage.entities[0].type == "bot_command"
    ) {
      if (ctxMessage.text == config.botCommands.start) {
        const response = `🇰🇬 Саламатсызбы! Посылкаңыз боюнча маалымат билүү үчүн, посылкаңыздын номерин мага жибериңиз.\n🇷🇺 Здравствуйте! Чтобы узнать информацию о вашей посылке, отправьте мне код вашей посылки.`;
        sendMessage(ctxMessage.from.id, response);
      }
    } else if (ctxMessage.text.match(/^(YT|JT)?\d{13}$|^\d{15}$/)) {
      const sheet = ss.getSheetByName(config.sheets.sheetTracking);
      const row = getRowByID(sheet, ctxMessage.text);
      if (row) {
        const id = sheet.getRange(row, config.db.id).getDisplayValue();
        const china = sheet.getRange(row, config.db.china).getDisplayValue();
        const delivery = sheet
          .getRange(row, config.db.delivery)
          .getDisplayValue();
        const deliveryDate = sheet
          .getRange(row, config.db.deliveryDate)
          .getDisplayValue();
        const status = sheet.getRange(row, config.db.status).getDisplayValue();
        const comment = sheet
          .getRange(row, config.db.comment)
          .getDisplayValue();

        const response = `Трек код: ${id}\nДата поступления на склад в Китае: ${china}\nДата отправки в ваш город: ${delivery}\nОжидаемое время получения: ${deliveryDate}\nСтатус посылки: ${status}\nКомментарий от менеджера: ${comment}`;
        sendMessage(ctxMessage.from.id, response);
      } else {
        sendMessage(ctxMessage.from.id, "Трек код посылки не найден");
      }
    } else {
      sendMessage(
        ctxMessage.from.id,
        "Команда не найдена или не правильный формат трек кода"
      );
    }
  }

  if (ctx.callback_query) {
  }
}
