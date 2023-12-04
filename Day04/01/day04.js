const { log } = require("console");
const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

let response = 0;

input.pop();
input.forEach((line, lineNumber) => {
  const [_, numbers] = line.split(": ");
  const [winningNumbers, drawnNumbers] = numbers.split(" | ").map((side) =>
    side
      .split(" ")
      .filter((n) => n)
      .map((n) => parseInt(n))
  );

  const goodNumers = winningNumbers.reduce((acc, number) => {
    if (drawnNumbers.includes(number)) {
      acc++;
    }
    return acc;
  }, 0);

  if (goodNumers === 0) {
    return;
  }

  response += Math.pow(2, goodNumers - 1);
});

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
