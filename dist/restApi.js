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
  "중국어(간체)": "zh-CN",
  "중국어(번체)": "zh-TW",
  독일어: "de",
};
const KAKAO_SUPPORT_LANGUAGE = {
  한국어: "kr",
  영어: "en",
  일본어: "jp",
  "중국어(간체)": "cn",
  "중국어(번체)": "cn",
  독일어: "de",
};

export async function restAPI(
  currentColumnNum,
  currentCardIndex,
  parentOfCard,
  childOfCard
) {
  console.log("restAPI ON");
  //parent 처리
  const parent = getParent(parentOfCard, currentColumnNum, currentCardIndex);
  const children = getChildren(childOfCard, currentColumnNum, currentCardIndex);
  let source = [];
  let targets = [[]];
  let sourceText = "";
  if (!parent) {
    if (!children) {
      console.log("부모x 자식x");
      // 부모 x 자식 x
      return;
    } else {
      console.log("부모x 자식o");
      // 부모 x 자식 => o source는 나 자신, target은 자식들
      source = [currentColumnNum, currentCardIndex];
      targets = children.slice();
      sourceText = getSourceText(source);
      translateEachChild(source, targets, sourceText);
    }
  } else {
    if (!children) {
      console.log("부모o 자식x");
      //부모 o 자식 x => source는 부모, target은 나 자신
      source = parent;
      targets = [[currentColumnNum, currentCardIndex]];
      sourceText = getSourceText(source);
      translateEachChild(source, targets, sourceText);
    } else {
      console.log("부모x 자식x");
      //부모 o 자식 o source 부모, target나 로 1번 한 후에 source 나, target 자식으로 한번 더
      source = parent;
      targets = [[currentColumnNum, currentCardIndex]];
      sourceText = getSourceText(source);
      translateEachChild(source, targets, sourceText);

      source = [currentColumnNum, currentCardIndex];
      targets = children.slice();
      sourceText = getSourceText(source);
      translateEachChild(source, targets, sourceText);
    }
  }

  // chidren 처리(chidren 길이만큼 반복해야 함 (호출, 넣기))
  async function translateEachChild(source, targets, sourceText) {
    targets.forEach(async (target) => {
      const typeOfTranslator = getTypeOfTranslator(target);
      const sourceLanguage = getSourceLanguage(source, typeOfTranslator);
      const targetLanguage = getTargetLanguage(target, typeOfTranslator);
      const translatedText = await getTranslatedText(
        typeOfTranslator,
        sourceText,
        sourceLanguage,
        targetLanguage
      );
      insertTranslatedTextToBox(translatedText, target);
    });
  }

  function getParent(parentOfCard, currentColumnNum, currentCardIndex) {
    const parent = parentOfCard[currentColumnNum][currentCardIndex];
    if (parent[0] === "no parent") {
      return false;
    } else {
      return parent;
    }
  }

  function getChildren(childOfCard, currentColumnNum, currentCardIndex) {
    if (!childOfCard[currentColumnNum]) {
      return false;
    } else {
      const children = childOfCard[currentColumnNum][currentCardIndex];
      return children;
    }
  }
}

function getSourceText(source) {
  const [sourceCol, sourceRow] = source;
  const sourceText = document.querySelector(
    `#textarea-${sourceCol}-${sourceRow}`
  ).value;
  return sourceText;
}
function getSourceLanguage(source, typeOfTranslator) {
  const [sourceCol, sourceRow] = source;
  const sourceLanguage = document.querySelector(
    `input[name="radio-${sourceCol}-${sourceRow}"]:checked`
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
function getTypeOfTranslator(child) {
  const [childCol, childRow] = child;
  const typeOfTranslator = document.querySelector(
    `#selector-${childCol}-${childRow}`
  );
  return typeOfTranslator.dataset.type;
}
function getTargetLanguage(target, typeOfTranslator) {
  const [targetCol, targetRow] = target;

  const targetLanguage = document.querySelector(
    `input[name="radio-${targetCol}-${targetRow}"]:checked`
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
  sourceText,
  sourceLanguage,
  targetLanguage
) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/translate",
      dataType: "json",
      type: "POST",
      data: {
        original: sourceText,
        source: sourceLanguage,
        target: targetLanguage,
        type: typeOfTranslator,
      },
      success: (result) => {
        if (result) {
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
function insertTranslatedTextToBox(translatedText, target) {
  const [targetColumnNum, targetCardIndex] = target;
  document.querySelector(
    `#textarea-${targetColumnNum}-${targetCardIndex}`
  ).value = translatedText;
}
