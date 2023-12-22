const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const limits: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const gameValid = (reveals: string[]) => {
  for (const reveal of reveals) {
    const items = reveal.split(",");
    for (const item of items) {
      const [count, color] = item.trim().split(" ");
      if (Number(count) > limits[color]) return false;
    }
  }
  return true;
};

const part1 = (input: string) => {
  const lines = input.split("\n");
  const validGames = [];
  for (const game of lines) {
    if (!game.length) continue;
    const [id_parts, rest] = game.split(":");
    const reveals = rest.trim().split("; ");
    if (gameValid(reveals)) {
      const id = id_parts.split(" ")[1];
      validGames.push(Number(id));
    }
  }
  return validGames.reduce((a, b) => a + b, 0);
};

const myInput = await Bun.file("input/day2.txt").text();

const test = part1(testInput);
console.log(test);

const prod = part1(myInput);
console.log(prod);

const gamePower = (reveals: string[]) => {
  const required: Record<string, number> = {
    red: 1,
    green: 1,
    blue: 1,
  };
  for (const reveal of reveals) {
    const items = reveal.split(",");
    for (const item of items) {
      const [count, color] = item.trim().split(" ");
      if (required[color] < Number(count)) required[color] = Number(count);
    }
  }
  return required.red * required.green * required.blue;
};

const part2 = (input: string) => {
  const lines = input.split("\n");
  let total = 0;
  for (const game of lines) {
    if (!game.length) continue;
    const [, rest] = game.split(":");
    const reveals = rest.trim().split("; ");
    total += gamePower(reveals);
  }
  return total;
};

const test2 = part2(testInput);
console.log("test2", test2);

const prod2 = part2(myInput);
console.log("prod2", prod2);
