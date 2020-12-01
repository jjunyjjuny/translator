"use strict";
import { restAPI } from "./restApi.js";

const SUPPORT_LANGUAGE = [
  "한국어",
  "영어",
  "일본어",
  "중국어",
  "스페인어",
  "기타",
];

const colAndRowIndex = [];
const parentOfCard = [[]];
const childOfCard = [];
const draws = [];
const board = document.getElementById("board");

function createColumn(isFirstClomun = false) {
  const column = document.createElement("article");
  column.classList.add("column");
  colAndRowIndex.push(0);
  const columnIndex = colAndRowIndex.length - 1;
  column.setAttribute("id", `column-${columnIndex}`);

  const cardList = document.createElement("div");
  cardList.setAttribute("id", `cardList-${columnIndex}`);
  cardList.classList.add("cardList");

  column.appendChild(cardList);

  const btn_addCardToCardList = createButtonOfCreateCard(
    columnIndex,
    isFirstClomun
  );
  column.appendChild(btn_addCardToCardList);
  if (!isFirstClomun) {
    createDrawbox();
  }
  board.appendChild(column);
}

function createCard(columnIndex, parent, isFirstClomun = false) {
  const rowIndex = colAndRowIndex[columnIndex]++;

  const card = document.createElement("article");
  card.setAttribute("id", `card-${columnIndex}-${rowIndex}`);
  card.classList.add("card");

  const menuDIV = createMenuBar(columnIndex, rowIndex);
  card.appendChild(menuDIV);

  const cardContents = document.createElement("div");
  cardContents.classList.add("card-contents");
  cardContents.setAttribute("id", `contents-${columnIndex}-${rowIndex}`);

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
  removeLines();
  drawLine();
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

  const btn_minimize = document.createElement("img");
  btn_minimize.setAttribute("src", "./src/btn_minimize.png");
  btn_minimize.setAttribute("width", 32);
  btn_minimize.setAttribute("height", 32);
  btn_minimize.classList.add("minimize");

  const btn_close = document.createElement("img");
  btn_close.setAttribute("src", "./src/btn_x.png");
  btn_close.setAttribute("width", 24);
  btn_close.setAttribute("height", 24);

  btn_close.classList.add("close");
  btn_close.addEventListener("click", () => {
    removeCard(columnIndex, rowIndex);
  });
  menuDIV.appendChild(btn_minimize);
  menuDIV.appendChild(btn_close);
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
    btn_toggle.setAttribute("width", 24);
    btn_toggle.setAttribute("height", 24);

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
  textareaDIV.classList.add("card-textareaBox", "flex");

  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", `textarea-${columnIndex}-${rowIndex}`);
  textarea.addEventListener("change", () => {
    restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
  });
  textarea.classList.add("card-textarea");
  textareaDIV.appendChild(textarea);

  const btn_removeText = document.createElement("img");
  btn_removeText.setAttribute("src", "./src/btn_x.png");
  btn_removeText.setAttribute("width", 24);
  btn_removeText.setAttribute("height", 24);
  textareaDIV.appendChild(btn_removeText);
  return textareaDIV;
}

function createFooter(columnIndex, rowIndex) {
  const footerDIV = document.createElement("div");
  footerDIV.classList.add("card-footer", "flex");

  const textCount = document.createElement("div");
  textCount.classList.add("card-textCount");
  textCount.innerText = "0 / 5000";

  const btn_createChildCard = document.createElement("div");
  const img_btnOfCreateChildCard = document.createElement("img");
  img_btnOfCreateChildCard.setAttribute(
    "src",
    "./src/btn_create_child_card.png"
  );
  btn_createChildCard.appendChild(img_btnOfCreateChildCard);
  btn_createChildCard.addEventListener("click", () => {
    if (colAndRowIndex.length === columnIndex + 1) {
      createColumn();
    }
    createCard(columnIndex + 1, [columnIndex, rowIndex]);
  });

  footerDIV.appendChild(textCount);
  footerDIV.appendChild(btn_createChildCard);
  return footerDIV;
}

function createButtonOfCreateCard(columnIndex, isFirstClomun) {
  const button = document.createElement("button");
  button.classList.add("btn_createCard", "flex");
  button.innerHTML = `<span>번역박스 추가</span><img src="./src/btn_plus.png"/ width="14" height="16">`;

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

function createDrawbox() {
  const draw = SVG().addTo("#board").size(128, 500);
  draw.addClass("drawBox");
  draws.push(draw);
}

function drawLine() {
  for (let i = 0; i < draws.length; i++) {
    const drawbox = draws[i];

    const familys = createFamilys(i);
    const x_middle = 62;
    familys.forEach((family) => {
      const parent = document.getElementById(
        `contents-${family[0]}-${family[1]}`
      );
      const child = document.getElementById(
        `contents-${family[2]}-${family[3]}`
      );
      const parentCard_height = parent.offsetHeight / 2;

      const childCard_height = child.offsetHeight / 2;
      const boardTopY = document.getElementById("board").getBoundingClientRect()
        .top;
      const parentTopY = parent.getBoundingClientRect().top;
      const childTopY = child.getBoundingClientRect().top;
      const y_parent = parentTopY - boardTopY + parentCard_height;
      const y_child = childTopY - boardTopY + childCard_height;
      drawbox.size(128, y_parent + y_child);

      const path = drawbox.path(
        `M14 ${y_parent} C${x_middle} ${y_parent} ${x_middle} ${y_child} ${
          x_middle * 2 - 14
        } ${y_child}`
      );

      path.fill("none");
      path.marker("start", 10, 10, (add) => {
        add.circle(10).fill("#444");
        add.circle(8).fill("#fff").center(5, 5);
      });

      path.marker("end", 10, 10, (add) => {
        add.circle(10).fill("#444");
        add.circle(8).fill("#fff").center(5, 5);
      });
      path.stroke({
        color: "#444",
        width: 1,
        linecap: "round",
        linejoin: "round",
      });
    });
  }
}

function removeLines() {
  for (let i = 0; i < draws.length; i++) {
    const drawbox = draws[i];
    drawbox.clear();
  }
}

function getIndexOfParents(parentColIndex) {
  const cardList = childOfCard[parentColIndex];
  const parents = [];
  for (let i = 0; i < cardList.length; i++) {
    if (cardList[i].length > 0) {
      const parent = [parentColIndex, i];
      parents.push(parent);
    }
  }
  return parents;
}

function getIndexChild(parent) {
  const [col_p, row_p] = parent;
  const children = childOfCard[col_p][row_p];
  return children;
}

function createFamilys(parentColIndex) {
  const familys = [];
  const parents = getIndexOfParents(parentColIndex);
  parents.forEach((parent) => {
    const children = getIndexChild(parent);
    children.forEach((child) => {
      const arr = [...parent, ...child];
      familys.push(arr);
    });
  });
  return familys;
}
function removeCard(col, row) {
  const parent = eraseParentIndexOnParentOfCard(parentOfCard, col, row);
  if (parent !== "no parent") {
    const [p_col, p_row] = parent;
    eraseChildIndexOnChildOfCard(childOfCard, p_col, p_row, col, row);
  }

  const children = eraseChildrenIndexOnChildOfCard(childOfCard, col, row);
  if (children !== "no children") {
    children.forEach((child) => {
      const [c_col, c_row] = child;
      eraseParentIndexOnParentOfCard(parentOfCard, c_col, c_row);
    });
  }
  document.getElementById(`card-${col}-${row}`).remove();
  colAndRowIndex[col]--;

  if (colAndRowIndex[col] === 0) {
    removeColumn(col);
  }

  removeLines();
  drawLine();
}

function removeColumn(col) {
  document.getElementById(`column-${col}`).remove();
  colAndRowIndex.splice(col, 1);
  removeDrawBox(col);
}
function removeDrawBox(col) {
  draws[col - 1].remove();
  draws.splice(col - 1, 1);
}

function eraseParentIndexOnParentOfCard(parentOfCard, col, row) {
  if (parentOfCard[col][row][0] === "none") {
    return "no parent";
  } else {
    const parent = parentOfCard[col][row].slice();
    parentOfCard[col][row][0] = "none";
    return parent;
  }
}
function eraseChildrenIndexOnChildOfCard(childOfCard, col, row) {
  if (childOfCard[col][row].length === 0) {
    return "no children";
  } else {
    const children = childOfCard[col][row].slice();
    childOfCard[col][row].length = 0;
    return children;
  }
}
function eraseChildIndexOnChildOfCard(childOfCard, p_col, p_row, c_col, c_row) {
  const children = childOfCard[p_col][p_row];
  if (children.length === 0) {
    return "no children";
  } else {
    let index = 0;
    for (let i = 0; i < children.length; i++) {
      if (
        children[i].length === [c_col, c_row].length &&
        children[i].every((value, index) => value === [c_col, c_row][index])
      ) {
        index = i;
      }
    }
    children.splice(index, 1);
  }
}
document.addEventListener("DOMContentLoaded", setDefault());

window.parent = [1, 1];
