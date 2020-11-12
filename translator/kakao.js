require("dotenv").config();
const CREDENTIALS_KAKAO = JSON.parse(process.env.CREDENTIALS_KAKAO);
module.exports.kakaoTranslator = async (query, source, targetLanguage) => {
  console.log("kakao on");
  console.log(CREDENTIALS_KAKAO.rest_api_key);
  console.log(query, source, targetLanguage);
  const api_url = "https://dapi.kakao.com/v2/translation/translate";
  const detectLanguage_url = "/v2/translation/language/detect";

  const options = {
    url: api_url,
    form: { query: query, src_lang: source, target_lang: targetLanguage },
    headers: {
      Authorization: `KakaoAK ${CREDENTIALS_KAKAO.rest_api_key}`,
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
  console.log("translate on");

  const request = require("request");
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      console.log("post on");
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).translated_text;
        console.log(result);
        resolve(result);
      } else {
        console.log("error = " + response.statusCode);
        console.log(body);
        reject(0);
      }
    });
  });
};
