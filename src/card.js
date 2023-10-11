createCard = (id, question, answers, correctAnswer) => {
  const card = {
    id: id,
    question: question,
    answers: answers,
    correctAnswer: correctAnswer
  }
  return card;
}


evaluateGuess = (guess, correctAnswer) => {
  if (guess === correctAnswer) {
    return `Correct!`;
  }
  else {
    return `Incorrect!`;
  }
}

createDeck = (cards) => {
   const deck = cards.map((card) => {
    return card;
  })
  return deck;
}

countCards = (deck) => {
  return deck.length;
}

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  countCards
};