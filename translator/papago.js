const client_id = "b5Z06SyJtW5iQWFjwHw6";
const client_secret = "U_qKSPfCWX";
module.exports.papagoTranslator = async (query, source, target) => {
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
