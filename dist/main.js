"use strict";
<<<<<<< HEAD
import { restAPI } from "./restApi.js";
const SUPPORT_LANGUAGE = [
  "한국어",
  "영어",
  "중국어(간체)",
  "일본어",
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
  // const title = document.createElement("h2");
  // title.innerHTML = "입력";
  colAndRowIndex.push(0);
  const columnIndex = colAndRowIndex.length - 1;

  const cardList = document.createElement("div");
  cardList.classList.add("cardList");

  const defaultCard = createCard(columnIndex, isFirstClomun);
  cardList.appendChild(defaultCard);

  column.appendChild(cardList);

  const btn_addCardToCardList = document.createElement("button");

  return column;
}

function createCard(columnIndex, isFirstClomun) {
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

  if (!isFirstClomun) {
    //일단 동작 테스트를 위해 임시로 col-1을 부모로 지정
    const parent = [columnIndex - 1, rowIndex];
    const child = [columnIndex, rowIndex];
    setParent(parentOfCard, parent, child);
    setChild(childOfCard, parent, child);
  }
=======

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
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
  return card;
}
function createListBySurpportLanguageOfTranslator(
  supporedLanguae,
  columnIndex,
<<<<<<< HEAD
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

  const selector = createSelectorOfTranslatorType2(
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
function createSelectorOfTranslatorType2(columnIndex, rowIndex, isFirstClomun) {
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

  //자식 칼럼 있으면 or 없으면에 따라 다르게 구분
  // img_btnOfCreateChildCard.addEventListener("click", () => {
  //   restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
  // });

  footerDIV.appendChild(textCount);
  footerDIV.appendChild(btn_CreateChildCard);
  return footerDIV;
}
=======
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

>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
function setDefault() {
  board.appendChild(createColumn(true));
  board.appendChild(createColumn());
}

<<<<<<< HEAD
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

=======
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
//test function

const btnTest = document.getElementById("btnTest");
btnTest.addEventListener("click", () => {
<<<<<<< HEAD
  board.appendChild(createColumn());
});

document.addEventListener("DOMContentLoaded", setDefault());

window.parent = [1, 1];
=======
  console.log("btn");
  board.appendChild(createColumn());
});
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
