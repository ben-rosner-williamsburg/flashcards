const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, countCards, createRound } = require('../src/card');

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
    expect(round.deck).to.equal([card1, card2, card3]);
  })
  it('should have a currentCard', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal?', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);
    expect(round.currentCard).to.equal(card1);
  })
})