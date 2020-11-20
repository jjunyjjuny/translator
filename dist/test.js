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

