const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();
const input = fs.readFileSync('../input.txt', 'utf8').split('\n');

const cardStrength = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const HAND_STRENGTH = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIRS: 2,
  THREE_OF_A_KIND: 3,
  FULL_HOUSE: 4,
  FOUR_OF_A_KIND: 5,
  FIVE_OF_A_KIND: 6,
};

const parseLine = (line) => {
  const [hand, bid] = line.split(' ');
  const cards = new Map();

  for (card of hand) {
    if (cards.has(card)) {
      cards.set(card, cards.get(card) + 1);
    } else {
      cards.set(card, 1);
    }
  }

  const cardAmounts = new Set(cards.values());

  let handStrength = HAND_STRENGTH.HIGH_CARD;


  if (cards.size === 1) {
    handStrength = HAND_STRENGTH.FIVE_OF_A_KIND;
  } else if (cardAmounts.has(4)) {
    handStrength = HAND_STRENGTH.FOUR_OF_A_KIND;
  } else if (cardAmounts.has(3) && cardAmounts.has(2)) {
    handStrength = HAND_STRENGTH.FULL_HOUSE;
  } else if (cardAmounts.has(3)) {
    handStrength = HAND_STRENGTH.THREE_OF_A_KIND;
  } else if (cards.size === 3) {
    handStrength = HAND_STRENGTH.TWO_PAIRS;
  } else if (cards.size === 4) {
    handStrength = HAND_STRENGTH.ONE_PAIR;
  }

  return [hand.split(''), handStrength, Number(bid)];
}

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

const response = input.map(parseLine).sort(compareHands).reduce(sumMultiplyByIndex, 0);

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
