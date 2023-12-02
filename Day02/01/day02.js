const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();
const input = fs.readFileSync("../input.txt", "utf8").split("\n");

const maxRolls = { red: 12, green: 13, blue: 14 };

let response = 0;

input.forEach((line) => {
  if (!line) {
    return;
  }

  const [game, stats] = line.split(":");
  const gameId = Number(game.split(" ").at(-1));
  const rounds = stats.split(";");

  let impossibleGame = false;

  const results = rounds.forEach((round) => {
    return round.split(",").forEach((result) => {
      const [colorAmount, colorName] = result.trim().split(" ");

      if (Number(colorAmount) > maxRolls[colorName]) {
        impossibleGame = true;
      }
    });
  });

  if (!impossibleGame) {
    response += gameId;
  }
});

console.log(response);

const end = performance.now();

console.log(`Execution time: ${(end - start) / 1000} seconds`);
