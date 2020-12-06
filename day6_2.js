fs = require("fs");

function getGroups(){
    let input = fs.readFileSync("day6_input.txt", "utf8").trim();
    return input.split(/\r?\n\r?\n/).map(x => x.split(/\r?\n/))
}

function intersect(a, b){
    return a.filter(x => b.includes(x))
}

var groups = getGroups();

var unanimousYesPerGroup = groups
    .map(x => 
        x.length > 1
        ? x.reduce((a, b) => intersect([...a], [...b]))
        : [...x[0]])
    .map(x => x.length);

var unanimousYesPerGroupSum = unanimousYesPerGroup.reduce((a, b) => a + b, 0)

console.log(unanimousYesPerGroupSum)