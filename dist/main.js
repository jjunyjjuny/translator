"use strict";
<<<<<<< HEAD
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

=======
>>>>>>> 74dc787... eventListener-restAPI() 연결 성공
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
<<<<<<< HEAD
  const cardIndex = colAndCardIndex[columnNum]++;
  const surppotrLanguageList = createListBySurpportLanguageOfTranslator(
    SUPPORT_LANGUAGE,
    columnNum,
    cardIndex
  );
  const selector = createSelectorOfTranslatorType(
    columnNum,
    cardIndex,
    isFirstClomun
  );
  const textarea = createTextarea(columnNum, cardIndex, isFirstClomun);
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
          ${selector.outerHTML}
        </div>
      ${surppotrLanguageList.outerHTML}
        `
      }
    </div>
  `;
<<<<<<< HEAD
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
=======
  card.appendChild(textarea);
>>>>>>> 74dc787... eventListener-restAPI() 연결 성공
=======
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
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
  return card;
}
function createListBySurpportLanguageOfTranslator(
  supporedLanguae,
  columnIndex,
<<<<<<< HEAD
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
=======
  rowIndex
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
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

<<<<<<< HEAD
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
=======
function createTextarea(columnIndex, rowIndex, isFirstClomun) {
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", `textarea-${columnIndex}-${rowIndex}`);
  textarea.addEventListener("change", () => {
    restAPI(columnIndex, rowIndex, parentOfCard, childOfCard);
  });
  textarea.classList.add("textarea");
  return textarea;
}

>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
function setDefault() {
  board.appendChild(createColumn(true));
  board.appendChild(createColumn());
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
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

<<<<<<< HEAD
=======
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
=======
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
//test function

const btnTest = document.getElementById("btnTest");
btnTest.addEventListener("click", () => {
<<<<<<< HEAD
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
=======
  board.appendChild(createColumn());
});

document.addEventListener("DOMContentLoaded", setDefault());
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 74dc787... eventListener-restAPI() 연결 성공
=======
console.log(colAndCardIndex);
>>>>>>> db23f02... 구글, 파파고, 카카오에 따른 표기법 처리
=======

window.parent = [1, 1];
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
