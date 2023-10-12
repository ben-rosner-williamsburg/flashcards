const { createDeck, createRound, countCards, calculatePercentCorrect,  endRound } = require('./card');
const util = require('./util');

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}
function printQuestion(round) {
  util.main(round);
}
function start(prototypeQuestions) {
  const deck = createDeck(prototypeQuestions);
  const round = createRound(deck);
  printMessage(deck);
  printQuestion(round);
  calculatePercentCorrect(round);
  endRound(round);
}


module.exports = { printMessage, printQuestion, start };