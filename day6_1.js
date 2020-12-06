fs = require("fs");

function getGroups(){
    let input = fs.readFileSync("day6_input.txt", "utf8").trim();
    return input.split(/\r?\n\r?\n/).map(x => x.split(/\r?\n/))
}

var groups = getGroups();

var distinctYesPerGroup = groups
    .map(x => 
        x.reduce((distinctAnswers, userAnswers) => new Set([...distinctAnswers, ...userAnswers]), []))
    .map(x => x.size);

var distinctYesSum = distinctYesPerGroup.reduce((a, b) => a + b, 0)

console.table(distinctYesPerGroup)
console.log(distinctYesSum)