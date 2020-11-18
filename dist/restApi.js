"use strict";
export function restAPI(originalColumnNum, originalCardIndex) {
  console.log("restAPI on");

  const originalText = getOriginalText(originalColumnNum, originalCardIndex);
  console.log("originalText :", originalText);
  const sourceLanguage = getSourceLanguage(
    originalColumnNum,
    originalCardIndex
  );
  const TypeOfTranslator = getTypeOfTranslator(
    originalColumnNum,
    originalCardIndex
  );
}

function getOriginalText(originalColumnNum, originalCardIndex) {
  console.log(originalColumnNum, originalCardIndex);
  console.log("id :", `textarea-${originalColumnNum}-${originalCardIndex}`);
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
}
function getTargetLanguage(originalColumnNum, originalCardIndex) {
  const targetLanguage = document.querySelector(
    `input[name="radio-${originalColumnNum + 1}-${originalCardIndex}"]:checked`
  );
  return targetLanguage;
}
function getTranslatedText(originalColumnNum, originalCardIndex) {}
function insertTranslatedTextToBox(originalColumnNum, originalCardIndex) {}

// const originalBox = document.getElementById("original-text");
// const original = originalBox.value;
// const targetBox = document.getElementById("translate-target");
// const target = targetBox.options[targetBox.selectedIndex].value;
// const type = document.querySelector(".translator_type").value;
// const source = "ko";
// $.ajax({
//   url: "/translate",
//   dataType: "json",
//   type: "POST",
//   data: { original: original, source: source, target: target, type: type },
//   success: (result) => {
//     if (result) {
//       $("#translate-text").html(result.result);
//     }
//   },
//   error: (request, status, error) => {
//     alert(
//       "code = " +
//         request.status +
//         " message = " +
//         request.responseText +
//         " error = " +
//         error
//     );
//   },
// });
