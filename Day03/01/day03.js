const { log } = require("console");
const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

let response = 0;

const findIndexes = (line, numbers) => {
  const numbersWithIndexes = [];
  let string = line;

  for (const number of numbers) {
    const index = string.indexOf(number);

    numbersWithIndexes.push([number, index]);

    string = string.replace(number, ".".repeat(number.length));
  }

  return numbersWithIndexes;
};

input.pop();
input.forEach((line, lineNumber) => {
  const numbers = line.match(/\d+/g);

  const numbersSet = new Set(numbers);

  if (!numbers) {
    return;
  }

  const numbersWithIndexes = findIndexes(line, numbers);

  numbersWithIndexes.forEach(([number, indexInString]) => {
    const region = [
      [Math.max(indexInString - 1, 0), Math.max(lineNumber - 1, 0)],
      [
        Math.min(indexInString + number.length, line.length - 1),
        Math.min(lineNumber + 1, input.length - 1),
      ],
    ];

    const [start, end] = region;

    for (let currentY = start.at(1); currentY <= end.at(1); currentY++) {
      if (/[^\d.]/.test(input[currentY].slice(start.at(0), end.at(0) + 1))) {
        response += Number(number);
        return;
      }
    }
  });
});

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
