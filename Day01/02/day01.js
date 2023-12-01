const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();
const input = fs.readFileSync('../input.txt', 'utf8').split('\n');
const numberInLettersRegex = /(?=(one|two|three|four|five|six|seven|eight|nine))/g;

const numberMapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const lastIndefOfDigit = (line) => {
  const size = line.length

  for (let i = size - 1; i >= 0; i--) {
    if (line[i] >= '0' && line[i] <= '9') {
      return i
    }
  }

  return -1
}

const firstIndexOfDigit = (line) => {
  const size = line.length

  for (let i = 0; i < size; i++) {
    if (line[i] >= '0' && line[i] <= '9') {
      return i
    }
  }

  return -1
}

let wholeResult = 0;

input.forEach((line) => {
  if (!line) {
    return
  }

  const numbersInLetters = Array.from(line.matchAll(numberInLettersRegex), match => match.at(1));
  const indexOfFirstDigit = firstIndexOfDigit(line)
  const indexOfLastDigit = lastIndefOfDigit(line)

  let firstNumber = indexOfFirstDigit < 0 ? -1 : Number(line.at(indexOfFirstDigit)) * 10;
  let lastNumber = indexOfLastDigit < 0 ? -1 : Number(line.at(indexOfLastDigit))

  if (numbersInLetters.length > 0) {
    const firstNumberInLetters = numbersInLetters.at(0)
    const lastNumberInLetters = numbersInLetters.at(-1)

    const indexOfFirstNumberInLetters = line.indexOf(firstNumberInLetters)
    const indexOfLastNumberInLetters = line.lastIndexOf(lastNumberInLetters)

    if ((indexOfFirstNumberInLetters < indexOfFirstDigit) || firstNumber === -1) {
      firstNumber = numberMapping[firstNumberInLetters] * 10
    }

    if ((indexOfLastNumberInLetters > indexOfLastDigit) || lastNumber === -1) {
      lastNumber = numberMapping[lastNumberInLetters]
    }
  }

  console.log(firstNumber + lastNumber, line);
  wholeResult += (firstNumber + lastNumber)
});

console.log(wholeResult);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);

