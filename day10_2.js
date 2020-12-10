fs = require("fs");

function getNumbers() {
  let input = fs.readFileSync("day10_input.txt", "utf8").trim();
  return input.split(/\r?\n/).map((x) => parseInt(x));
}
var input = getNumbers();
var sortedNumbers = [0, ...input];

sortedNumbers.sort((a, b) => (a > b ? 1 : -1));

let permutations = [[0]];

for (let x = 0; x < permutations.length; x++) {
  const currentPermutation = permutations[x];

  for (let i = sortedNumbers.indexOf(currentPermutation[currentPermutation.length - 1]) + 1; i < sortedNumbers.length - 1; i++) {
    const validAdaptersUpperIndex = Math.min(sortedNumbers.length - 1, i + 3);
    
    const adapterCandidates = sortedNumbers
      .slice(i , validAdaptersUpperIndex);

    const validAdapters = adapterCandidates
      .filter((x) => x - sortedNumbers[i - 1] <= 3);

    for (let j = 1; j < validAdapters.length; j++) {
      permutations.push([...currentPermutation, validAdapters[j]]);
    }

    currentPermutation.push(validAdapters[0]);
  }
}

console.log(permutations.length);
