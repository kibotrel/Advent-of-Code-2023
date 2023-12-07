const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();
const input = fs.readFileSync('../input.txt', 'utf8').split('\n');

const cardStrength = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
const HAND_STRENGTH = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIRS: 2,
  THREE_OF_A_KIND: 3,
  FULL_HOUSE: 4,
  FOUR_OF_A_KIND: 5,
  FIVE_OF_A_KIND: 6,
};

let response = 0;

const computeHandStrength = (cards) => {
  const cardAmounts = new Set(cards.values());

  if (cards.size === 1) {
    return HAND_STRENGTH.FIVE_OF_A_KIND;
  } else if (cardAmounts.has(4)) {
    return HAND_STRENGTH.FOUR_OF_A_KIND;
  } else if (cardAmounts.has(3) && cardAmounts.has(2)) {
    return HAND_STRENGTH.FULL_HOUSE;
  } else if (cardAmounts.has(3)) {
    return HAND_STRENGTH.THREE_OF_A_KIND;
  } else if (cards.size === 3) {
    return HAND_STRENGTH.TWO_PAIRS;
  } else if (cards.size === 4) {
    return HAND_STRENGTH.ONE_PAIR;
  }

  return HAND_STRENGTH.HIGH_CARD;
};

const findMostRepeatedCard = (acc, current) => (current.at(1) > acc.at(1) ? current : acc);

const parseLine = (line) => {
  const [hand, bid] = line.split(' ');
  const cards = new Map();

  for (const card of hand) {
    if (cards.has(card)) {
      cards.set(card, cards.get(card) + 1);
    } else {
      cards.set(card, 1);
    }
  }

  const jokers = cards.get('J') || 0;

  if (jokers > 0) {
    cards.delete('J');

    const [cardName] = [...cards.entries()].reduce(findMostRepeatedCard, [null, 0]);

    cards.set(cardName, cards.get(cardName) + jokers);
  }

  const handStrength = computeHandStrength(cards);

  return [hand.split(''), handStrength, Number(bid)];
};

const compareHands = ([handA, handStrengthA], [handB, handStrengthB]) => {
  const difference = handStrengthA - handStrengthB;

  if (difference !== 0) {
    return difference;
  }

  for (let index = 0; index < handA.length; index++) {
    const cardA = handA[index];
    const cardB = handB[index];

    if (cardStrength.indexOf(cardA) > cardStrength.indexOf(cardB)) {
      return 1;
    } else if (cardStrength.indexOf(cardA) < cardStrength.indexOf(cardB)) {
      return -1;
    }
  }

  return 0;
};

const sumMultiplyByIndex = (acc, [_, __, bid], index) => acc + bid * (index + 1);

input.pop();

const reponse = input.map(parseLine).sort(compareHands).reduce(sumMultiplyByIndex, 0);

console.log(reponse);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
