function setWebhook() {
  let response = UrlFetchApp.fetch(
    `${config.apiUrlTelegram}${config.tokenTelegram}/setWebhook?url=${config.webUrl}`
  );
  Logger.log("telegram response status is " + response.getContentText());
}
function removeWebhook() {
  let response = UrlFetchApp.fetch(
    `${config.apiUrlTelegram}${config.tokenTelegram}/setWebhook?url=`
  );
  Logger.log("telegram response status is " + response.getContentText());
}
