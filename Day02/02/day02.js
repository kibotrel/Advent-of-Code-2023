const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

let response = 0;

input.forEach((line) => {
  if (!line) {
    return;
  }

  const leastRolls = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const [game, stats] = line.split(":");
  const gameId = Number(game.split(" ").at(-1));
  const rounds = stats.split(";");

  const results = rounds.forEach((round) => {
    round.split(",").forEach((result) => {
      const [colorAmount, colorName] = result.trim().split(" ");

      if (Number(colorAmount) > leastRolls[colorName]) {
        leastRolls[colorName] = Number(colorAmount);
      }
    });
  });

  response += leastRolls.red * leastRolls.green * leastRolls.blue;
});

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
