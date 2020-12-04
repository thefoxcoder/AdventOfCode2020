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

    return result;
  });

  return inputAsObjects;
}

function isFourDigits(value) {
  return value.length === 4 && /[\d]{4}/.test(value);
}

function isBirthYearValid(birthYear) {
  if (!isFourDigits(birthYear)) {
    return false;
  }

  const birthYearInteger = parseInt(birthYear);

  return birthYearInteger >= 1920 && birthYearInteger <= 2002;
}

function isIssueYearValid(issueYear) {
  if (!isFourDigits(issueYear)) {
    return false;
  }

  const issueYearInteger = parseInt(issueYear);

  return issueYearInteger >= 2010 && issueYearInteger <= 2020;
}

function isExpirationYearValid(expirationYear) {
  if (!isFourDigits(expirationYear)) {
    return false;
  }

  const expirationYearInteger = parseInt(expirationYear);

  return expirationYearInteger >= 2020 && expirationYearInteger <= 2030;
}

function isHeightValid(height) {
  const heightRegex = /([\d]+)((?:cm)|(?:in))/;

  const heightMatches = heightRegex.exec(height);

  if (heightMatches == null) {
    return false;
  }

  const heightInteger = parseInt(heightMatches[1]);
  const heightUnit = heightMatches[2];

  if (heightUnit === "cm" && heightInteger >= 150 && heightInteger <= 193) {
    return true;
  }

  if (heightUnit === "in" && heightInteger >= 59 && heightInteger <= 76) {
    return true;
  }

  return false;
}

function isHairColorValid(hairColor) {
  const hairColorRegex = /#[0-9a-f]{6}/;
  return hairColorRegex.test(hairColor);
}

function isEyeColorValid(eyeColor) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validEyeColors.includes(eyeColor);
}

function isPassportIdvalid(passportId) {
  const passportIdRegex = /[\d]{9}/;
  return passportId.length === 9 && passportIdRegex.test(passportId);
}

function isFieldvalid(key, value) {
  switch (key) {
    case "byr":
      return isBirthYearValid(value);
    case "iyr":
      return isIssueYearValid(value);
    case "eyr":
      return isExpirationYearValid(value);
    case "hgt":
      return isHeightValid(value);
    case "hcl":
      return isHairColorValid(value);
    case "ecl":
      return isEyeColorValid(value);
    case "pid":
      return isPassportIdvalid(value);
    case "cid":
      return true;
    default:
      return false;
  }
}

function passportIsValid(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return (
    requiredFields.every((x) => passport.hasOwnProperty(x)) &&
    Object.keys(passport).every((key) => isFieldvalid(key, passport[key]))
  );
}

var passports = convertInputToObjects();

var validPassports = passports.filter(passportIsValid);

console.log(validPassports.length);
console.table(validPassports);

