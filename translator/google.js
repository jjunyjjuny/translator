"use strict";
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

// Your credentials
const CREDENTIALS_GOOGLE = JSON.parse(process.env.CREDENTIALS_GOOGLE);

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS_GOOGLE,
  projectId: CREDENTIALS_GOOGLE.project_id,
});

module.exports.detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
};

module.exports.googleTranslator = async (query, targetLanguage) => {
  try {
    let [response] = await translate.translate(query, targetLanguage);
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};


