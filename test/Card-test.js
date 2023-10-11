const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess } = require('../src/card');

describe('card', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });  
});

describe('evaluateGuess', function() {
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