fs = require("fs");

function getNumbers() {
  let input = fs.readFileSync("day9_input.txt", "utf8").trim();
  return input.split(/\r?\n/).map(x => parseInt(x));
}

function validAsPairFrom(numbers, value) {
  var allPossibleSums = new Set();

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      allPossibleSums.add(sum);
    }
  }

  return allPossibleSums.has(value);
}

const preambleCount = 25;
const numbers = getNumbers();

for (let i = preambleCount; i < numbers.length; i++) {
  const previousNumbers = numbers.slice(i - preambleCount, i);
  if (!validAsPairFrom(previousNumbers, numbers[i])) {
    console.log(numbers[i]);
    break;
  }
}
