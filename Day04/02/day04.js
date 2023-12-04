const { log } = require("console");
const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

input.pop();

const map = new Map(Array.from({ length: input.length }, (_, i) => [i, 1]));

input.forEach((line, lineNumber) => {
  const [_, numbers] = line.split(": ");
  const [winningNumbers, drawnNumbers] = numbers
    .split(" | ")
    .map((side) => side.split(" ").filter((n) => n));

  const goodNumers = winningNumbers.reduce((acc, number) => {
    if (drawnNumbers.includes(number)) {
      acc++;
    }

    return acc;
  }, 0);

  if (goodNumers === 0) {
    return;
  }

  const cardTries = map.get(lineNumber);

  for (let index = 1; index <= goodNumers; index++) {
    map.set(lineNumber + index, map.get(lineNumber + index) + cardTries);
  }
});

const response = Array.from(map.values()).reduce(
  (acc, value) => acc + value,
  0
);

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
