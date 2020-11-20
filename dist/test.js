<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
const childOfCard = [[[[1, 0]]]];

function setChild(childOfCard, parent, child) {
  const [parentCol, parentRow] = parent;
  if (childOfCard.length <= parentCol) {
    childOfCard.push([]);
  }
  console.log(childOfCard);
  if (childOfCard[parentCol].length <= parentRow) {
    childOfCard[parentCol].push([]);
  }
  childOfCard[parentCol][parentRow].push(child);
  console.log("1 :", childOfCard);
  console.log("2 :", childOfCard[parentCol]);
}

setChild(childOfCard, [0, 0], [1, 1]);
setChild(childOfCard, [0, 0], [1, 2]);

setChild(childOfCard, [1, 0], [2, 0]);
setChild(childOfCard, [1, 1], [2, 1]);
setChild(childOfCard, [1, 1], [2, 2]);
setChild(childOfCard, [1, 0], [2, 3]);

<<<<<<< HEAD
=======
console.log("why");
>>>>>>> b950032... type=module시 main.js가 인식되지 않는 이유??
=======
>>>>>>> d5fd0b1... 너무 많이 바꿨는데 커밋을 안 함;;. restAPI 호출할 때 부모가 있는지, 자식이 있는지에 따라 처리하도록 함, 번역기 바꾸면 바로 restAPI 호출하도록 함
