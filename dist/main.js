"use strict";
import { restAPI } from "./restApi.js";
const SUPPORT_LANGUAGE = [
  "한국어",
  "영어",
  "일본어",
  "중국어(간체)",
  "중국어(번체)",
];

const colAndRowIndex = [];
const parentOfCard = [[]];
const childOfCard = [];

const board = document.getElementById("board");

function createColumn(isFirstClomun = false) {
  const column = document.createElement("article");
  column.classList.add("column");
  // const title = document.createElement("h2");
  // title.innerHTML = "입력";
  colAndRowIndex.push(0);
  const columnIndex = colAndRowIndex.length - 1;

  const cardList = document.createElement("div");
  cardList.setAttribute("id", `cardList-${columnIndex}`);
  cardList.classList.add("cardList");

  column.appendChild(cardList);

  const btn_addCardToCardList = createButtonOfCreateCard(
    columnIndex,
    isFirstClomun
  );
  column.appendChild(btn_addCardToCardList);
  board.appendChild(column);
}

function createCard(columnIndex, parent, isFirstClomun = false) {
  const rowIndex = colAndRowIndex[columnIndex]++;

  const card = document.createElement("article");
  card.classList.add("card");

  const menuDIV = createMenuBar(columnIndex, rowIndex);
  card.appendChild(menuDIV);

  const cardContents = document.createElement("div");
  cardContents.classList.add("card-contents");

  const navDiv = createNavbar(columnIndex, rowIndex, isFirstClomun);
  cardContents.appendChild(navDiv);

  const textarea = createTextarea(columnIndex, rowIndex);
  cardContents.appendChild(textarea);

  const footer = createFooter(columnIndex, rowIndex);
  cardContents.appendChild(footer);

  card.appendChild(cardContents);
  const myself = [columnIndex, rowIndex];

  setChild(childOfCard, myself, "none");

  if (parent[0] === "none") {
    setParent(parentOfCard, parent, myself);
  } else {
    setParent(parentOfCard, parent, myself);
    setChild(childOfCard, parent, myself);
  }

  const cardList = document.getElementById(`cardList-${columnIndex}`);
  cardList.appendChild(card);
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
  minimizeSapn.innerHTML = "ㅡ";
  const closeSapn = document.createElement("span");
  closeSapn.classList.add("close");
  closeSapn.innerHTML = "X";

  menuDIV.appendChild(minimizeSapn);
  menuDIV.appendChild(closeSapn);
  return menuDIV;
}

function createNavbar(columnIndex, rowIndex, isFirstClomun) {
  const navDIV = document.createElement("div");
  navDIV.classList.add("card-nav", "flex");

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
    navDIV.appendChild(selector);
  }

  navDIV.appendChild(surppotrLanguageList);
  return navDIV;
}

function createSelectorOfTranslatorType(columnIndex, rowIndex, isFirstClomun) {
  if (!isFirstClomun) {
    const selectorDIV = document.createElement("div");
    selectorDIV.classList.add("card-selectorBox", "dropdown", "flex-vertical");

    const selectedBox = document.createElement("div");
    selectedBox.classList.add("card-selectedBox", "btn_dropdown", "flex");
    selectedBox.addEventListener("click", () => {
      selectorList.classList.toggle("show");
    });

    const selectedTranslatorType = document.createElement("img");
    selectedTranslatorType.setAttribute(
      "id",
      `selector-${columnIndex}-${rowIndex}`
    );
    selectedTranslatorType.setAttribute("src", "./src/img_google.png");
    selectedTranslatorType.setAttribute("data-type", "google");

    const btn_toggle = document.createElement("img");
    btn_toggle.setAttribute("src", "./src/btn_toggle.png");

    selectedBox.appendChild(selectedTranslatorType);
    selectedBox.appendChild(btn_toggle);

    selectorDIV.appendChild(selectedBox);

    const list = ["google", "papago", "kakao"];
    const dropdownBox = document.createElement("div");
    dropdownBox.classList.add("dropdownBox");

    const selectorList = document.createElement("ul");
    selectorList.classList.add("dropdown-content");
    list.forEach((type) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.setAttribute("src", `./src/img_${type}.png`);
      img.setAttribute("data-type", `${type}`);
      img.addEventListener("click", () => {
        selectedTranslatorType.setAttribute("src", `./src/img_${type}.png`);
        selectedTranslatorType.setAttribute("data-type", `${type}`);
        selectorList.classList.remove("show");
        restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
      });
      li.appendChild(img);
      selectorList.appendChild(li);
    });
    dropdownBox.appendChild(selectorList);
    selectorDIV.appendChild(dropdownBox);

    return selectorDIV;
  } else {
    return "error";
  }
}

function createTextarea(columnIndex, rowIndex) {
  const textareaDIV = document.createElement("div");
  textareaDIV.classList.add("card-textareaBox");

  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", `textarea-${columnIndex}-${rowIndex}`);
  textarea.addEventListener("change", () => {
    restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
  });
  textarea.classList.add("card-textarea");
  textareaDIV.appendChild(textarea);
  return textareaDIV;
}

function createFooter(columnIndex, rowIndex) {
  const footerDIV = document.createElement("div");
  footerDIV.classList.add("flex", "card-footer");

  const textCount = document.createElement("div");
  textCount.classList.add("card-textCount");
  textCount.innerText = "0 / 5000";

  const btn_CreateChildCard = document.createElement("div");
  const img_btnOfCreateChildCard = document.createElement("img");
  img_btnOfCreateChildCard.setAttribute(
    "src",
    "./src/btn_create_child_card.png"
  );
  btn_CreateChildCard.appendChild(img_btnOfCreateChildCard);
  btn_CreateChildCard.addEventListener("click", () => {
    if (colAndRowIndex.length === columnIndex + 1) {
      createColumn();
    }
    createCard(columnIndex + 1, [columnIndex, rowIndex]);
  });

  footerDIV.appendChild(textCount);
  footerDIV.appendChild(btn_CreateChildCard);
  return footerDIV;
}

function createButtonOfCreateCard(columnIndex, isFirstClomun) {
  const button = document.createElement("button");
  button.classList.add("btn_CreateCard");
  button.innerText = "+";

  button.addEventListener("click", () => {
    createCard(columnIndex, ["none"], isFirstClomun);
  });
  return button;
}

function setDefault() {
  createColumn(true);
  createCard(colAndRowIndex.length - 1, ["none"], true);
  createColumn();
  createCard(colAndRowIndex.length - 1, [0, 0]);
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
  if (child !== "none") {
    childOfCard[parentCol][parentRow].push(child);
  }
}

document.addEventListener("DOMContentLoaded", setDefault());

window.parent = [1, 1];
