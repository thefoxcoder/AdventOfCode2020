fs = require("fs");

function getRules() {
  let input = fs.readFileSync("day7_input.txt", "utf8").trim();
  return input.split(/\r?\n/);
}

function getBagColor(rule) {
  const regex = /[\w\s]+?(?=\sbags)/;
  return regex.exec(rule)[0];
}

function getBagContents(rule) {
  const regex = /[\d]+[\w\s]+(?=\sbag)/g;
  const matches = rule.match(regex);

  const contents =
    matches != null
      ? matches.map((match) => ({
          amount: parseInt(match[0]),
          color: match.substring(2),
        }))
      : [];

  return contents;
}

function getBag(rule) {
  const color = getBagColor(rule);
  const content = getBagContents(rule);

  return { color, content };
}

function getAmountOfBagsFor(dict, bagColor) {
  const bagContents = dict[bagColor];

  var innerBagsSum =
    bagContents.length > 0
      ? bagContents.reduce(
          (sum, bag) => sum + bag.amount + bag.amount * getAmountOfBagsFor(dict, bag.color),
          0
        )
      : 0;

  return innerBagsSum;
}

const bagDictionary = [];

const rules = getRules();

rules.forEach((rule) => {
  const bag = getBag(rule);
  bagDictionary[bag.color] = bag.content;
});

var amountOfBagsForShinyGold = getAmountOfBagsFor(bagDictionary, "shiny gold");

console.log(amountOfBagsForShinyGold);
