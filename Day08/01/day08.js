const fs = require('fs');
const { performance } = require('perf_hooks');

const start = performance.now();

const input = fs.readFileSync('../input.txt', 'utf8').split('\n');
const sequence = input.shift().split('')
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
  let nodeName = 'AAA'

  for (let step = 0;; step++) {
    const node = network.get(nodeName);
    const side = sequence.at(step % sequence.length);

    nodeName = node[side];

    if (nodeName === 'ZZZ') {
      return step + 1;
    }
  }
};

const response = traverseNetwork(network, sequence);

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
