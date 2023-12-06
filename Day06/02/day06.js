const { log } = require('console');
const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();

const [timeString, DistanceString] = fs.readFileSync('../input.txt', 'utf8').split('\n');
const time = Number(timeString.match(/\d+/g).join(''));
const distance = Number(DistanceString.match(/\d+/g).join(''));

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

console.log(recordBreakingScenarios);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
