fs = require("fs");

function getInstructions() {
  let input = fs.readFileSync("day8_input.txt", "utf8").trim();
  return input.split(/\r?\n/);
}


const instructions = getInstructions();
const executedInstructionIndexes = [];

let instructionIndex = 0
let accumulator = 0

while(!executedInstructionIndexes.includes(instructionIndex)){
    executedInstructionIndexes.push(instructionIndex);
    var currentInstruction = instructions[instructionIndex].substring(0, 3);
    var currentInstructionArgument = parseInt(instructions[instructionIndex].substring(4));

    if(currentInstruction === "jmp"){
        instructionIndex += currentInstructionArgument;
    } else if(currentInstruction === "acc") {
        accumulator += currentInstructionArgument;
        instructionIndex += 1;
    } else if(currentInstruction === "nop"){
        instructionIndex += 1;
    } else {
        throw new Error(`Invalid instruction ${currentInstruction}`)
    }
}

console.log(accumulator);