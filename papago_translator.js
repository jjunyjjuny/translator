const client_id = "b5Z06SyJtW5iQWFjwHw6";
const client_secret = "U_qKSPfCWX";
module.exports.papagoTranslator = async (query, source, target) => {
  console.log("papagoTranslator on");
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: api_url,
    form: { text: query, source: source, target: target },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  try {
    console.log("try on");
    let response = await translate(options);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return "error";
  }
};

const translate = async (options) => {
  const request = require("request");
  console.log("translate on");
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      console.log("request on");
      if (!error && response.statusCode == 200) {
        console.log("if on");
        const result = JSON.parse(body).message.result;
        console.log("result.translatedText :", result.translatedText);
        resolve(result.translatedText);
      } else {
        console.log("error = " + response.statusCode);
        reject(0);
      }
    });
  });
};
