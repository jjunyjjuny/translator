const client_id = "b5Z06SyJtW5iQWFjwHw6";
const client_secret = "U_qKSPfCWX";
module.exports.papagoTranslator = (query, source, target) => {
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const request = require("request");
  const options = {
    url: api_url,
    form: { text: query, source: source, target: target },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  console.log('papago 3가지', query, source, target)

  request.post(options, (error, response, body) => {
    console.log('post code, error :',response.statusCode, error)
    return new Promise((resolve, reject) => {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).message.result;
        console.log ('result :', result)
        console.log('result.translatedText :',result.translatedText)
        resolve(result.translatedText);
      } else {
        reject("error입니다용");
        console.log("error = " + response.statusCode);
      }
    });
  });
};
