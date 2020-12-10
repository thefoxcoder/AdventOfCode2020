fs = require("fs");

function getNumbers() {
  let input = fs.readFileSync("day10_input.txt", "utf8").trim();
  return input.split(/\r?\n/).map((x) => parseInt(x));
}

var numbers = getNumbers();
numbers.sort((a, b) => a > b ? 1 : -1);

let oneDiffs = 1
let threeDiffs = 1

for(let i = 0; i < numbers.length - 1; i++){
    const diff = numbers[i + 1] - numbers[i];

    if(diff === 3){
        threeDiffs += 1;
    }

    if(diff === 1){
        oneDiffs += 1
    }
}

console.log(oneDiffs * threeDiffs)