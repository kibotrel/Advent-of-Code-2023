const { log } = require("console");
const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

let response = 0;

const isAdjacent = (current, other) =>
  current.at(0) === other.at(0) &&
  (current.at(1) === other.at(1) - 1 || current.at(1) === other.at(1) + 1);

const findDigits = (coordinates, direction) => {
  const [y, x] = coordinates;
  const digits = [];

  let index = 1;
  while (/\d/.test(input.at(y).at(x + index * direction))) {
    digits.push(input.at(y).at(x + index * direction));
    index++;
  }

  return direction === -1 ? digits.reverse().join("") : digits.join("");
};

input.pop();
input.forEach((line, lineNumber) => {
  for (let index = 0; index < line.length; index++) {
    if (line.at(index) !== "*") {
      continue;
    }

    const coordinates = [lineNumber, index];
    const surroundingCoordinates = [
      [coordinates.at(0) - 1, coordinates.at(1) - 1],
      [coordinates.at(0) - 1, coordinates.at(1)],
      [coordinates.at(0) - 1, coordinates.at(1) + 1],
      [coordinates.at(0), coordinates.at(1) - 1],
      [coordinates.at(0), coordinates.at(1) + 1],
      [coordinates.at(0) + 1, coordinates.at(1) - 1],
      [coordinates.at(0) + 1, coordinates.at(1)],
      [coordinates.at(0) + 1, coordinates.at(1) + 1],
    ].filter(
      ([y, x]) => x >= 0 && x < line.length && y >= 0 && y < input.length
    );

    const validCoordinates = surroundingCoordinates
      .filter(([y, x]) => {
        if (/\d/.test(input[y].at(x))) {
          return [y, x];
        }
      })
      .filter((_, index, array) => {
        if (index === 0) {
          return true;
        }

        const current = array.at(index);
        const previous = array.at(index - 1);

        return !isAdjacent(current, previous);
      });

    if (validCoordinates.length === 2) {
      const [first, second] = validCoordinates;

      const firstNumber = `${findDigits(first, -1)}${input
        .at(first.at(0))
        .at(first.at(1))}${findDigits(first, 1)}`;
      const secondNumber = `${findDigits(second, -1)}${input
        .at(second.at(0))
        .at(second.at(1))}${findDigits(second, 1)}`;

      console.log(firstNumber, secondNumber);

      response += Number(firstNumber) * Number(secondNumber);
    }
  }
});

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
