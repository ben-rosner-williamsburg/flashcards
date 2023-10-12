const createCard = (id, question, answers, correctAnswer) => {
  const card = {
    id: id,
    question: question,
    answers: answers,
    correctAnswer: correctAnswer
  }
  return card;
}


const evaluateGuess = (guess, correctAnswer) => {
  if (guess === correctAnswer) {
    return `Correct!`;
  }
  else {
    return `Incorrect!`;
  }
}

const createDeck = (cards) => {
   const deck = cards.map((card) => {
    return card;
  })
  return deck;
}

const countCards = (deck) => {
  return deck.length;
}

const createRound = (deck) => {
  const round = {
    deck: deck,
    currentCard: deck[0],
    turns: 0,
    incorrectGuesses: [],
  }
  return round;
}

const takeTurn = (guess, round) => {
  round.turns++;
  let cardIndex = round.deck.indexOf(round.currentCard);
  if (evaluateGuess(guess, round.currentCard.correctAnswer) === `Correct!`){
    cardIndex++;
    round.currentCard = round.deck[cardIndex];
    return `Correct!`;
  }
  else if (evaluateGuess(guess, round.currentCard.correctAnswer) === `Incorrect!`) {
    round.incorrectGuesses.push(round.currentCard.id);
    cardIndex++;
    round.currentCard = round.deck[cardIndex];
    return `Incorrect!`;
  }
  
  
 
}

const calculatePercentCorrect = (round) => {
  const percentCorrect = (100 * (round.turns - round.incorrectGuesses.length)/(round.turns));
  return percentCorrect;
}


const endRound = (round) => {
 return `** Round over! ** You answered ${calculatePercentCorrect(round)}% of the questions correctly!`
}

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
};