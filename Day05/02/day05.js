const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

const STAGES = {
  SEEDS: 0,
  SOIL: 1,
  FERTILIZER: 2,
  WATER: 4,
  LIGHT: 8,
  TEMPERATURE: 16,
  HUMIDITY: 32,
  LOCATION: 64,
};

const seeds = [];
const maps = new Map([
  [STAGES.SOIL, []],
  [STAGES.FERTILIZER, []],
  [STAGES.WATER, []],
  [STAGES.LIGHT, []],
  [STAGES.TEMPERATURE, []],
  [STAGES.HUMIDITY, []],
  [STAGES.LOCATION, []],
]);

let stage = STAGES.SEEDS;

input.forEach((line, lineNumber) => {
  if (line.length === 0) {
    return;
  }

  switch (line) {
    case "seed-to-soil map:": {
      stage = STAGES.SOIL;
      return;
    }
    case "soil-to-fertilizer map:": {
      stage = STAGES.FERTILIZER;
      return;
    }
    case "fertilizer-to-water map:": {
      stage = STAGES.WATER;
      return;
    }
    case "water-to-light map:": {
      stage = STAGES.LIGHT;
      return;
    }
    case "light-to-temperature map:": {
      stage = STAGES.TEMPERATURE;
      return;
    }
    case "temperature-to-humidity map:": {
      stage = STAGES.HUMIDITY;
      return;
    }
    case "humidity-to-location map:": {
      stage = STAGES.LOCATION;
      return;
    }
    default: {
      if (stage === STAGES.SEEDS) {
        const [_, seedNumbers] = line.split(": ");

        seeds.push(...seedNumbers.split(" ").map((n) => parseInt(n, 10)));
      } else {
        const stageMap = maps.get(stage);
        const [destinationStart, sourceStart, rangeLength] = line
          .split(" ")
          .map((n) => parseInt(n, 10));

        stageMap.push([
          [sourceStart, sourceStart + rangeLength - 1],
          [destinationStart, destinationStart + rangeLength - 1],
        ]);
      }
    }
  }
});

const seedRanges = [];

for (let index = 0; index < seeds.length; index += 2) {
  seedRanges.push([seeds.at(index), seeds.at(index + 1) + seeds.at(index) - 1]);
}

let lowestSeed = Number.MAX_SAFE_INTEGER;

seedRanges.forEach(([firstSeed, lastSeed]) => {
  let currentNumber = undefined;

  for (let currentSeed = firstSeed; currentSeed <= lastSeed; currentSeed++) {
    currentNumber = currentSeed;

    for (let stage = 1; stage <= 64; stage *= 2) {
      const stageRange = maps.get(stage).find((range) => {
        const [[sourceStart, sourceEnd]] = range;

        return currentNumber >= sourceStart && currentNumber <= sourceEnd;
      });

      currentNumber = !stageRange
        ? currentNumber
        : stageRange[1][0] + (currentNumber - stageRange[0][0]);
    }

    if (currentNumber < lowestSeed) {
      lowestSeed = currentNumber;
    }
  }

  return currentNumber;
});

console.log(lowestSeed);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
