const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const isNumeric = (char: string) => Number.isInteger(Number(char));

const getSymbols = (line: string) => {
  const symbols: Record<string, Record<string, string>> = {};
  let row = 0,
    col = 0;
  for (const line of lines) {
    if (!line.length) continue;
    col = 0;
    for (const char of line) {
      if (char === ".") {
        col++;
        continue;
      }
      if (!isNumeric(char)) {
        symbols[row] = symbols[row] || {};
        symbols[row][col] = char;
      }
      col++;
    }
    row++;
  }
};

const part1 = (input: string) => {
  const lines = input.split("\n");
  const symbols: Record<string, Record<string, string>> = {};
  let row = 0,
    col = 0;
  for (const line of lines) {
    if (!line.length) continue;
    col = 0;
    for (const char of line) {
      if (char === ".") {
        col++;
        continue;
      }
      if (!isNumeric(char)) {
        symbols[row] = symbols[row] || {};
        symbols[row][col] = char;
      }
      col++;
    }
    row++;
  }
  row = 0;
  let num: string | undefined;
  let hasSymbol = false;
  const withSymbol = [];
  for (const line of lines) {
    if (!line.length) continue;
    col = 0;
    for (const char of line) {
      if (isNumeric(char)) {
        if (num) num += char;
        else num = char;
        hasSymbol =
          hasSymbol ||
          !!symbols[row - 1]?.[col] ||
          !!symbols[row + 1]?.[col] ||
          !!symbols[row]?.[col - 1] ||
          !!symbols[row]?.[col + 1] ||
          !!symbols[row - 1]?.[col - 1] ||
          !!symbols[row - 1]?.[col + 1] ||
          !!symbols[row + 1]?.[col - 1] ||
          !!symbols[row + 1]?.[col + 1];
        // console.log({ num, row, col, hasSymbol });
      } else {
        if (num && hasSymbol) withSymbol.push(num);
        num = undefined;
        hasSymbol = false;
      }
      col++;
    }
    row++;
  }
  return withSymbol.reduce((a, b) => a + Number(b), 0);
};

const test1 = part1(testInput);
console.log(test1);

const myInput = await Bun.file("input/day3.txt").text();

const p1 = part1(myInput);
console.log({ p1 });
