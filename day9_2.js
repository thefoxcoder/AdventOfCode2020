fs = require("fs");

function getNumbers() {
  let input = fs.readFileSync("day9_input.txt", "utf8").trim();
  return input.split(/\r?\n/).map((x) => parseInt(x));
}

const numbers = getNumbers();
const targetNumber = 26796446;

function getRange() {
  for (let i = 0; i < numbers.length - 1; i++) {
    let currentSum = numbers[i];
    var numbersToSum = [numbers[i]];

    for (let j = i + 1; j < numbers.length; j++) {
      numbersToSum.push(numbers[j]);

      var sum = numbersToSum.reduce((a, b) => a + b);

      if (sum === targetNumber) {
        return numbersToSum;
      }

      if (currentSum > targetNumber) {
        break;
      }
    }
  }
}

var rangeResultingInTarget = getRange();
var minInrange = Math.min(...rangeResultingInTarget);
var maxInRange = Math.max(...rangeResultingInTarget);

var result = minInrange + maxInRange
console.log(result)
