const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();

const input = fs.readFileSync('../input.txt', 'utf8').split('\n');
const sequence = input.shift().split('');
const network = new Map();

input.shift();
input.pop();

input.forEach((line) => {
  const [node, neighbors] = line.split(' = ');
  const [leftNeighbor, rightNeighbor] = neighbors
    .split(', ')
    .map((node) => node.replace(/[()]/g, ''));

  network.set(node, { L: leftNeighbor, R: rightNeighbor });
});

const traverseNetwork = (network, sequence) => {
  let currentNodes = [...network.keys()].filter((nodeName) => nodeName.endsWith('A'));

  const stepsForEachSolution = []

  for (let step = 0; currentNodes.length > 0; step++) {
    const nodes = currentNodes.map(node => network.get(node));
    const side = sequence.at(step % sequence.length);

    currentNodes = nodes.map(node => node[side]);

    for (const node of currentNodes) {
      if (node.endsWith('Z')) {;
        stepsForEachSolution.push(step + 1);
        currentNodes = currentNodes.filter(node => !node.endsWith('Z'));
      }
    }
  }

  return stepsForEachSolution;
};

const primeFactors = (number) => {
  const factors = [];

  for (let factor = 2; number > 1; factor++) {
    while (number % factor === 0) {
      factors.push(factor);
      number /= factor;
    }
  }

  return factors;
}

const leastCommonMultiple = (stepsPerRoute) => {
  const factors = new Set(stepsPerRoute.flatMap((steps) => primeFactors(steps)));

  return [...factors].reduce((acc, factor) => acc * factor, 1);
};

const stepsPerRoute = traverseNetwork(network, sequence);
const response = leastCommonMultiple(stepsPerRoute);

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
