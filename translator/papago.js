"use strict";
require("dotenv").config();
const CREDENTIALS_PAPAGO = JSON.parse(process.env.CREDENTIALS_PAPAGO);

module.exports.papagoTranslator = async (query, source, targetLanguage) => {
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: api_url,
    form: { text: query, source: source, target: targetLanguage },
    headers: {
      "X-Naver-Client-Id": CREDENTIALS_PAPAGO.client_id,
      "X-Naver-Client-Secret": CREDENTIALS_PAPAGO.client_secret,
    },
  };
  try {
    let response = await translate(options);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return "error";
  }
};

const translate = async (options) => {
  const request = require("request");
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).message.result;
        resolve(result.translatedText);
      } else {
        console.log("error = " + response.statusCode);
        reject(0);
      }
    });
  });
};
