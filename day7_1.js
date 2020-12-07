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

  return matches != null ? matches.map((match) => match.substring(2)) : [];
}

function getBag(rule) {
  const color = getBagColor(rule);
  const content = getBagContents(rule);

  return { color, content };
}

function getBagsThatCanHoldColor(dict, contentBagColor){
    return Object.keys(dict).filter(holdingBagColor => canBagOfColorHoldColor(dict, holdingBagColor, contentBagColor ))
}

function canBagOfColorHoldColor(dict, holdingBagColor, contentBagColor){
    if(dict[holdingBagColor].length === 0){
        return false;
    }

    if(dict[holdingBagColor].includes(contentBagColor)){
        return true;
    }

    for(let innerHoldingBagColor of dict[holdingBagColor]){
        if(canBagOfColorHoldColor(dict, innerHoldingBagColor, contentBagColor)){
            return true;
        }
    }

    return false;
}

const bagDictionary = {};

const rules = getRules();

rules.forEach((rule) => {
  const bag = getBag(rule);
  bagDictionary[bag.color] = bag.content;
});

const bagsValidForShinyGold = getBagsThatCanHoldColor(bagDictionary, "shiny gold");

console.log(bagsValidForShinyGold.length);
