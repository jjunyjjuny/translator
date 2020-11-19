"use strict";

export async function restAPI(originalColumnNum, originalCardIndex) {
  console.log("restAPI on");

  const originalText = getOriginalText(originalColumnNum, originalCardIndex);
  const sourceLanguage = getSourceLanguage(
    originalColumnNum,
    originalCardIndex
  );
  const TypeOfTranslator = getTypeOfTranslator(
    originalColumnNum,
    originalCardIndex
  );
  const targetLanguage = getTargetLanguage(
    originalColumnNum,
    originalCardIndex
  );
  console.log(originalText, sourceLanguage, TypeOfTranslator, targetLanguage);
  const translatedText = await getTranslatedText(
    TypeOfTranslator,
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
function getSourceLanguage(originalColumnNum, originalCardIndex) {
  const sourceLanguage = document.querySelector(
    `input[name="radio-${originalColumnNum}-${originalCardIndex}"]:checked`
  ).value;
  return sourceLanguage;
}
function getTypeOfTranslator(originalColumnNum, originalCardIndex) {
  const TypeOfTranslator = document.querySelector(
    `#selector-${originalColumnNum + 1}-${originalCardIndex}`
  );
  return TypeOfTranslator.value;
}
function getTargetLanguage(originalColumnNum, originalCardIndex) {
  const targetLanguage = document.querySelector(
    `input[name="radio-${originalColumnNum + 1}-${originalCardIndex}"]:checked`
  ).value;
  return targetLanguage;
}
function getTranslatedText(
  TypeOfTranslator,
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
        type: TypeOfTranslator,
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
