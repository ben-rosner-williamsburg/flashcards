const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, countCards, createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/card');

describe('card', function () {
  it('should be a function', function () {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function () {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');

    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });
});

describe('evaluateGuess', function () {
  it('should be a function', () => {
    expect(evaluateGuess).to.be.a('function');
  });

  it('should be able to check if a guess is correct', () => {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const guessToEval = evaluateGuess('object', card.correctAnswer);
    expect(guessToEval.guess).to.equal(guessToEval.correctAnswer);
    expect(guessToEval).to.equal(`Correct!`);
  });

  it('should be able to check if a guess is incorrect', () => {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const guessToEval = evaluateGuess('array', card.correctAnswer);
    expect(guessToEval).to.equal(`Incorrect!`);
  });
});

describe("deck", function () {
  it('should be a function', () => {
    expect(createDeck).to.be.a('function');
  });
  it('should consist of a deck that contains cards', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    expect(deck).to.deep.equal([card1, card2, card3]);
  });
  it('should have a length', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const numOfCards = countCards(deck);
    expect(numOfCards).to.deep.equal(3);
  });
});

describe("round", function () {
  it('should be a function', () => {
    expect(createRound).to.be.a("function");
  });
  it('should have a deck', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    expect(round.deck).to.deep.equal([card1, card2, card3]);
  })
  it('should have a currentCard that defaults to the first card of the deck', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    expect(round.currentCard).to.equal(card1);
  })
  it('should have a turns property that start at 0', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    expect(round.turns).to.equal(0); 
  })
  it('should have an incorrect guesses property that begins as an empty array', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    expect(round).to.have.property("incorrectGuesses").with.lengthOf(0);
  })
})

describe("takeTurn", function() {
  it('should be a function', () => { 
    expect(takeTurn).to.be.a("function");
  })
  it('should increment the turns count', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    takeTurn('sea otter', round);
    expect(round.turns).to.equal(1)
  })
  it('should make the next card the current card', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    takeTurn('sea otter', round);
    takeTurn('gallbladder', round);
    expect(round.currentCard.id).to.equal(12)
  })
  it('should return a string of correct for all correct guesses', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    const guessResult = takeTurn('sea otter', round);
    expect(guessResult).to.equal(`Correct!`);
  })
  it('should store all incorrect guesses in the incorrect guesses array', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    takeTurn('pug', round);
    expect(round.incorrectGuesses.length).to.equal(1);
  })
  it('should return a string of incorrect for all incorrect guesses', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    const guessResult = takeTurn('pug', round);
    expect(guessResult).to.equal(`Incorrect!`);
  })
})

describe("calculatePercentCorrect", function() {
  it('should calculate and return the percentage of correct guesses', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    takeTurn('pug', round);
    takeTurn('gallbladder', round);
    const percent = calculatePercentCorrect(round)
    expect(percent).to.equal(50);
  })
})

describe('endRound', function() {
  it('should return a string that has the percentage of correct questions answered', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    takeTurn('pug', round);
    takeTurn('gallbladder', round);
    const finishRound = endRound(round)
    expect(finishRound).to.equal("** Round over! ** You answered 50% of the questions correctly!")
  })
})