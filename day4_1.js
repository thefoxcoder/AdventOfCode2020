fs = require("fs");

function convertInputToObjects() {
  let input = fs.readFileSync("day4_input.txt", "utf8").trim();

  const keyValuePairArrays = input.split(/\r?\n\r?\n/).map((x) => {
    return x.split(/\s+/);
  });

  var inputAsObjects = keyValuePairArrays.map((kvpArray) => {
    const result = {};

    kvpArray.forEach((kvp) => {
      const split = kvp.split(":");
      const key = split[0];
      const value = split[1];
      result[key] = value;
    });

    return result
  });

  return inputAsObjects;
}

var passports = convertInputToObjects();

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

var validPassports = passports.reduce((sum, passport) => requiredFields.every(x => passport.hasOwnProperty(x)) ? sum + 1 : sum, 0)

console.log(validPassports);