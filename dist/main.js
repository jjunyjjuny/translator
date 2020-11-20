"use strict";
import { restAPI } from "./restApi.js";
const SUPPORT_LANGUAGE = [
  "한국어",
  "영어",
  "일본어",
  "중국어(간체)",
  "중국어(번체)",
  "독일어",
];

const colAndRowIndex = [];
const parentOfCard = [[["no parent"]]];
const childOfCard = [];

const board = document.getElementById("board");

function createColumn(isFirstClomun = false) {
  const column = document.createElement("article");
  column.classList.add("column");
  const title = document.createElement("h2");
  title.innerHTML = "입력";
  colAndRowIndex.push(0);
  const columnIndex = colAndRowIndex.length - 1;

  const defaultCard = createCard(columnIndex, isFirstClomun);
  column.appendChild(title);
  column.appendChild(defaultCard);

  return column;
}

function createCard(columnIndex, isFirstClomun) {
  const card = document.createElement("article");
  card.classList.add("card");
  const rowIndex = colAndRowIndex[columnIndex]++;
  const menuDIV = createMenuBar(columnIndex, rowIndex);
  const navDiv = createNavbar(columnIndex, rowIndex, isFirstClomun);
  const textarea = createTextarea(columnIndex, rowIndex, isFirstClomun);
  card.appendChild(menuDIV);
  card.appendChild(navDiv);
  card.appendChild(textarea);
  // if(){

  // }
  if (!isFirstClomun) {
    //일단 동작 테스트를 위해 임시로 col-1을 부모로 지정
    const parent = [columnIndex - 1, rowIndex];
    const child = [columnIndex, rowIndex];
    setParent(parentOfCard, parent, child);
    setChild(childOfCard, parent, child);
  }
  return card;
}
function createListBySurpportLanguageOfTranslator(
  supporedLanguae,
  columnIndex,
  rowIndex
) {
  const surppotrLanguageListDIV = document.createElement("div");
  surppotrLanguageListDIV.classList.add("language-select", "flex");
  const ul = document.createElement("ul");
  ul.classList.add("flex");
  let radio_count = 0;
  supporedLanguae.forEach((lan) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const radioIndex = `radio-${columnIndex}-${rowIndex}-${radio_count++}`;
    input.setAttribute("type", "radio");
    input.setAttribute("id", radioIndex);
    input.setAttribute("name", `radio-${columnIndex}-${rowIndex}`);
    input.setAttribute("value", lan);
    if (columnIndex === 0) {
      if (lan === "한국어") {
        input.setAttribute("checked", "checked");
      }
    } else {
      if (lan === "영어") {
        input.setAttribute("checked", "checked");
      }
    }
    input.addEventListener("click", () => {
      restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
    });

    const label = document.createElement("label");
    label.setAttribute("for", radioIndex);
    label.innerHTML = lan;
    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
    surppotrLanguageListDIV.appendChild(ul);
  });

  return surppotrLanguageListDIV;
}
function createMenuBar(columnIndex, rowIndex) {
  const menuDIV = document.createElement("div");
  menuDIV.classList.add("card-menu", "flex");
  menuDIV.setAttribute("id", `menu-${columnIndex}-${rowIndex}`);
  const minimizeSapn = document.createElement("span");
  minimizeSapn.classList.add("minimize");
  minimizeSapn.innerHTML = "최소화";
  const closeSapn = document.createElement("span");
  closeSapn.classList.add("close");
  closeSapn.innerHTML = "닫기";

  menuDIV.appendChild(minimizeSapn);
  menuDIV.appendChild(closeSapn);
  return menuDIV;
}

function createNavbar(columnIndex, rowIndex, isFirstClomun) {
  const navDIV = document.createElement("div");
  navDIV.classList.add("card-nav");
  const engineSelectorDIV = document.createElement("div");
  engineSelectorDIV.classList.add("engine-select", "flex");

  const selector = createSelectorOfTranslatorType(
    columnIndex,
    rowIndex,
    isFirstClomun
  );
  const surppotrLanguageList = createListBySurpportLanguageOfTranslator(
    SUPPORT_LANGUAGE,
    columnIndex,
    rowIndex
  );
  if (!isFirstClomun) {
    engineSelectorDIV.innerHTML = `
    <div>ㅁ</div>
    <div>google</div>
  `;
    engineSelectorDIV.appendChild(selector);
    navDIV.appendChild(engineSelectorDIV);
  }

  navDIV.appendChild(surppotrLanguageList);
  return navDIV;
}

function createSelectorOfTranslatorType(columnIndex, rowIndex, isFirstClomun) {
  if (!isFirstClomun) {
    const selector = document.createElement("select");
    selector.setAttribute("id", `selector-${columnIndex}-${rowIndex}`);
    selector.innerHTML = `<option value="google">구글</option>
    <option value="papago">파파고</option>
    <option value="kakao">카카오</option>`;
    selector.addEventListener("change", () => {
      restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
    });
    return selector;
  } else {
    return "error";
  }
}

function createTextarea(columnIndex, rowIndex, isFirstClomun) {
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", `textarea-${columnIndex}-${rowIndex}`);
  textarea.addEventListener("change", () => {
    restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
  });
  textarea.classList.add("textarea");
  return textarea;
}

function setDefault() {
  board.appendChild(createColumn(true));
  board.appendChild(createColumn());
}

function setParent(parentOfCard, parent, child) {
  const [childCol, childRow] = child;
  if (parentOfCard.length <= childCol) {
    parentOfCard.push([]);
  }
  parentOfCard[childCol].splice(childRow, 1, parent);
}

function setChild(childOfCard, parent, child) {
  const [parentCol, parentRow] = parent;
  if (childOfCard.length <= parentCol) {
    childOfCard.push([]);
  }
  if (childOfCard[parentCol].length <= parentRow) {
    childOfCard[parentCol].push([]);
  }
  childOfCard[parentCol][parentRow].push(child);
}

//test function

const btnTest = document.getElementById("btnTest");
btnTest.addEventListener("click", () => {
  board.appendChild(createColumn());
});

document.addEventListener("DOMContentLoaded", setDefault());

window.parent = [1, 1];
