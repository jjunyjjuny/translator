"use strict";

import { restAPI } from "./restApi.js";

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
//defaul
//이 배열의 index는 column의 넘버, 그 index의 값은 card의 갯수로 인지한다
const colAndCardIndex = [];

const board = document.getElementById("board");
board.innerHTML = "aaaaaaaaaaaaaaaa";
function createColumn(isFirstClomun = false) {
  const column = document.createElement("article");
  column.classList.add("column");
  const title = document.createElement("h2");
  title.innerHTML = "입력";
  colAndCardIndex.push(0);
  const columnNum = colAndCardIndex.length - 1;
  const defaultCard = createCard(columnNum, isFirstClomun);
  column.appendChild(title);
  column.appendChild(defaultCard);
  return column;
}

function createCard(columnNum, isFirstClomun) {
  const card = document.createElement("article");
  card.classList.add("card");
  const cardIndex = colAndCardIndex[columnNum]++;
  const surppotrLanguageList = createListBySurpportLanguageOfTranslator(
    GOOGLE_SUPPORT_LANGUAGE,
    columnNum,
    cardIndex
  );
  const textarea = createTextarea(columnNum, cardIndex);
  card.innerHTML = `
    <div class="card-menu flex">
      <span>최소화</span>
      <span>닫기</span>
    </div>
    <div class="card-nav">
      ${
        isFirstClomun
          ? surppotrLanguageList.outerHTML
          : `<div class="engine-select flex">
          <div>ㅁ</div>
          <div>google</div>
          <select class="translator_type">
            <option value="google">구글</option>
            <option value="papago">파파고</option>
            <option value="kakao">카카오</option>
          </select>
        </div>
      ${surppotrLanguageList.outerHTML}
        `
      }
    </div>
    ${textarea.outerHTML}
  `;
  return card;
}
function createListBySurpportLanguageOfTranslator(
  supporedLanguae,
  columnIndex,
  cardIndex
) {
  const div = document.createElement("div");
  div.classList.add("language-select", "flex");
  const ul = document.createElement("ul");
  ul.classList.add("flex");
  const columnName = `column-${columnIndex}-${cardIndex}`;
  let radio_count = 0;
  for (const key in supporedLanguae) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const radioIndex = `radio-${columnIndex}-${cardIndex}-${radio_count++}`;
    input.setAttribute("type", "radio");
    input.setAttribute("id", radioIndex);
    input.setAttribute("value", supporedLanguae[key]);
    input.setAttribute("name", columnName);
    if (columnIndex === 0) {
      if (key === "한국어") {
        input.setAttribute("checked", "checked");
      }
    } else {
      if (key === "영어") {
        input.setAttribute("checked", "checked");
      }
    }

    const label = document.createElement("label");
    label.setAttribute("for", radioIndex);
    label.innerHTML = key;
    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
    div.appendChild(ul);
  }
  console.log(div);
  return div;
}

function createTextarea(columnNum, cardIndex) {
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", `textarea-${columnNum}-${cardIndex} `);
  textarea.addEventListener("change", restAPI(columnNum - 1, cardIndex));
  return textarea;
}

function setDefault() {
  board.appendChild(createColumn(true));
  board.appendChild(createColumn());
}

//test function

const btnTest = document.getElementById("btnTest");
btnTest.addEventListener("click", () => {
  console.log("btn");
  board.appendChild(createColumn());
});
