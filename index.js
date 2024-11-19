document.getElementById("btn").addEventListener("click", launchGame);
document.getElementById("repeat").addEventListener("click", produceSound);

for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
  document.querySelectorAll(".image")[i].addEventListener("click", function () {
    showCard(i);
  });
}

const numberOfCards = 4;
let cards = [];
let winnerBefore;
let winner;
let cardClicked;

function launchGame() {
  cards = [];
  winnerBefore = "";
  winner = "";
  cardClicked = "";

  for (let i = 0; i < numberOfCards; i++) {
    generateIndexes();
  }

  populateCards();
  winnerBefore = Math.floor(Math.random() * 4);
  winner = cards[winnerBefore];
  produceSound(winner);
}

function generateIndexes() {
  let index = Math.floor(Math.random() * 15) + 1;
  let result = false;

  if (cards.length == 0) {
    cards.push(index);
  } else {
    for (elem in cards) {
      if (cards[elem] == index) {
        result = true;
      }
    }
    if (result == true) {
      generateIndexes();
    } else {
      cards.push(index);
    }
  }
}

function populateCards() {
  for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
    let source = `img/${cards[i]}.JPG`;
    document.querySelectorAll(".image")[i].setAttribute("src", source);
  }
}

function produceSound() {
  var x = new Audio(`audio/${winner}.m4a`);
  x.play();
}

function showCard(cardClickedIndex) {
  if (cardClickedIndex == winnerBefore) {
    var x = new Audio(`audio/correct.m4a`);
    x.play();

    setTimeout(() => {
      launchGame();
    }, "2000");
  } else {
    var x = new Audio(`audio/retry.m4a`);
    x.play();
  }
}

launchGame()
