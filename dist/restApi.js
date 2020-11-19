"use strict";
const GOOGLE_SUPPORT_LANGUAGE = {
  한국어: "ko",
  영어: "en",
  일본어: "ja",
  "중국어(간체)": "zh-CN",
  "중국어(번체)": "zh-TW",
  독일어: "de",
};
const PAPAGO_SUPPORT_LANGUAGE = {
  한국어: "ko",
  영어: "en",
  일본어: "ja",
  "중국어(간체)": "zh-cn",
  "중국어(번체)": "zh-tw",
  독일어: "de",
};
const KAKAO_SUPPORT_LANGUAGE = {
  한국어: "kr",
  영어: "en",
  일본어: "jp",
  중국어: "cn",
  독일어: "de",
};

export async function restAPI(originalColumnNum, originalCardIndex) {
  console.log("restAPI on");

  const typeOfTranslator = getTypeOfTranslator(
    originalColumnNum,
    originalCardIndex
  );
  const sourceLanguage = getSourceLanguage(
    originalColumnNum,
    originalCardIndex,
    typeOfTranslator
  );
  const originalText = getOriginalText(originalColumnNum, originalCardIndex);
  const targetLanguage = getTargetLanguage(
    originalColumnNum,
    originalCardIndex,
    typeOfTranslator
  );
  console.log(originalText, sourceLanguage, typeOfTranslator, targetLanguage);
  const translatedText = await getTranslatedText(
    typeOfTranslator,
    originalText,
    sourceLanguage,
    targetLanguage
  );
  console.log("translatedText :", translatedText);

  insertTranslatedTextToBox(
    translatedText,
    originalColumnNum,
    originalCardIndex
  );
}

function getOriginalText(originalColumnNum, originalCardIndex) {
  const originalText = document.querySelector(
    `#textarea-${originalColumnNum}-${originalCardIndex}`
  ).value;
  return originalText;
}
function getSourceLanguage(
  originalColumnNum,
  originalCardIndex,
  typeOfTranslator
) {
  const sourceLanguage = document.querySelector(
    `input[name="radio-${originalColumnNum}-${originalCardIndex}"]:checked`
  ).value;
  let sourceLanguageNotation = "";
  switch (typeOfTranslator) {
    case "google":
      sourceLanguageNotation = GOOGLE_SUPPORT_LANGUAGE[sourceLanguage];
      break;
    case "papago":
      sourceLanguageNotation = PAPAGO_SUPPORT_LANGUAGE[sourceLanguage];
      break;
    case "kakao":
      sourceLanguageNotation = KAKAO_SUPPORT_LANGUAGE[sourceLanguage];
      break;
  }

  return sourceLanguageNotation;
}
function getTypeOfTranslator(originalColumnNum, originalCardIndex) {
  const typeOfTranslator = document.querySelector(
    `#selector-${originalColumnNum + 1}-${originalCardIndex}`
  );
  return typeOfTranslator.value;
}
function getTargetLanguage(
  originalColumnNum,
  originalCardIndex,
  typeOfTranslator
) {
  const targetLanguage = document.querySelector(
    `input[name="radio-${originalColumnNum + 1}-${originalCardIndex}"]:checked`
  ).value;
  let targetLanguageNotation = "";
  switch (typeOfTranslator) {
    case "google":
      targetLanguageNotation = GOOGLE_SUPPORT_LANGUAGE[targetLanguage];
      break;
    case "papago":
      targetLanguageNotation = PAPAGO_SUPPORT_LANGUAGE[targetLanguage];
      break;
    case "kakao":
      targetLanguageNotation = KAKAO_SUPPORT_LANGUAGE[targetLanguage];
      break;
  }
  return targetLanguageNotation;
}
function getTranslatedText(
  typeOfTranslator,
  originalText,
  sourceLanguage,
  targetLanguage
) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/translate",
      dataType: "json",
      type: "POST",
      data: {
        original: originalText,
        source: sourceLanguage,
        target: targetLanguage,
        type: typeOfTranslator,
      },
      success: (result) => {
        if (result) {
          console.log("성공이다리 :", result.result);
          resolve(result.result);
        }
      },
      error: (request, status, error) => {
        alert(
          "code = " +
            request.status +
            " message = " +
            request.responseText +
            " error = " +
            error
        );
      },
    });
  });
}
function insertTranslatedTextToBox(
  translatedText,
  originalColumnNum,
  originalCardIndex
) {
  document.querySelector(
    `#textarea-${originalColumnNum + 1}-${originalCardIndex}`
  ).value = translatedText;
}
