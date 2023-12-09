const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();

const input = fs.readFileSync('../input.txt', 'utf8').split('\n');
const nextPredictions = []

input.pop();
input.forEach((line) => {
  const lasts = [];

  let sequence = line.split(' ').map(value => Number(value));

  while (sequence.every((value) => value === 0) === false) {
    lasts.unshift(sequence.at(-1));

    sequence = sequence.map((value, index) => {
      if (index === sequence.length - 1) {
        return 0;
      }

      return sequence.at(index + 1) - value;
    });

    sequence.pop();
  }

  const computedSequence = []

  lasts.forEach((value, index) =>
    index === 0
      ? computedSequence.push(value)
      : computedSequence.push(value + computedSequence.at(index - 1)),
  );

  nextPredictions.push(computedSequence.pop());
});

const response = nextPredictions.reduce((accumulator, value) => accumulator + value, 0);

console.log(response)

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
