const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

export const part1 = (input: string) => {
  const lines = input.split("\n");
  const values: string[] = [];
  for (const line of lines) {
    if (!line.length) continue;
    const numbers: string[] = [];
    for (const char of line) {
      if (Number.isInteger(Number(char))) numbers.push(char);
    }
    const value = `${numbers[0]}${numbers[numbers.length - 1]}`;
    values.push(value);
  }
  const total = values.reduce((a, b) => a + Number(b), 0);
  console.log(total);
}

const myInput = await Bun.file('input/day1.txt').text();

part1(myInput);

const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

export const part2 = (input: string) => {
  const lines = input.split("\n");
  const values: string[] = [];
  for (let line of lines) {
    if (!line.length) continue;
    line = line
      .replaceAll("one", "o1e")
      .replaceAll("two", "t2o")
      .replaceAll("three", "th3ee")
      .replaceAll("four", "f4ur")
      .replaceAll("five", "f5ve")
      .replaceAll("six", "s6x")
      .replaceAll("seven", "se7en")
      .replaceAll("eight", "ei8ht")
      .replaceAll("nine", "n9e");
    const numbers: string[] = [];
    for (const char of line) {
      if (Number.isInteger(Number(char))) numbers.push(char);
    }
    const value = `${numbers[0]}${numbers[numbers.length - 1]}`;
    values.push(value);
  }
  const total = values.reduce((a, b) => a + Number(b), 0);
  console.log(total);
}

part2(testInput2);
part2(myInput);
