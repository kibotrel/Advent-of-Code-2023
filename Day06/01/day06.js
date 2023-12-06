const { log } = require('console');
const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();

const [timeString, DistanceString] = fs.readFileSync('../input.txt', 'utf8').split('\n');
const times = timeString.match(/\d+/g).map(Number);
const distances = DistanceString.match(/\d+/g).map(Number);

const races = times.map((time, index) => ([
  time,
  distances.at(index),
]));

const recordBreakingScenarios = races.reduce((acc, race) => {
  const [time, distance] = race;

  let recordBreakingScenarios = 0;

  for (let timeSpentAccelerating = 1; timeSpentAccelerating < time; timeSpentAccelerating++) {
    const timeLeft = time - timeSpentAccelerating;
    const speed = timeSpentAccelerating;
    const traveledDistance = speed * timeLeft;

    if (traveledDistance > distance) {
      recordBreakingScenarios++;
    } else if (recordBreakingScenarios > 0) {
      break;
    }
  }

  return acc * recordBreakingScenarios;
}, 1);

console.log(recordBreakingScenarios);


const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
