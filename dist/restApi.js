"use strict";
export function restAPI(originalColumnNum, originalCardIndex) {
  console.log("restAPI");

  const originalText = getOriginalText(originalColumnNum, originalCardIndex);
  const sourceLanguage = getSourceLanguage(
    originalColumnNum,
    originalCardIndex
  );
  console.log("hi");
}

function getOriginalText(originalColumnNum, originalCardIndex) {
  const originalTextarea = document.getElementById(
    `textarea-${originalColumnNum}-${originalCardIndex}`
  );
  return originalTextarea.value;
}
function getSourceLanguage(originalColumnNum, originalCardIndex) {
  const sourceLanguage = document.querySelector(
    'input[name="radioName"]:checked'
  ).value;
  console.log(sourceLanguage);
}
function getTypeOfTranslator(originalColumnNum, originalCardIndex) {}
function getTargetLanguage() {}
function getTranslatedText() {}
function insertTranslatedTextToBox() {}

const originalBox = document.getElementById("original-text");
const original = originalBox.value;
const targetBox = document.getElementById("translate-target");
const target = targetBox.options[targetBox.selectedIndex].value;
const type = document.querySelector(".translator_type").value;
const source = "ko";
$.ajax({
  url: "/translate",
  dataType: "json",
  type: "POST",
  data: { original: original, source: source, target: target, type: type },
  success: (result) => {
    if (result) {
      $("#translate-text").html(result.result);
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

export function test(a) {
  console.log(a);
}
