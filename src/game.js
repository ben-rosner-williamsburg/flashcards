const { createDeck, createRound, countCards } = require('./card');
const util = require('./util');


function start(prototypeQuestions){
  const deck = createDeck(prototypeQuestions);
  const round = createRound(deck);
  printMessage(deck);
  printQuestion(round);
}

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

module.exports = { printMessage, printQuestion, start };
