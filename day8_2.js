fs = require("fs");

function getInstructions() {
    let input = fs.readFileSync("day8_input.txt", "utf8").trim();
    return input.split(/\r?\n/);
}


function getInstructionType(instruction) {
    return instruction.substring(0, 3);
}

function getInstructionArgument(instruction) {
    return parseInt(instruction.substring(4));
}

function switchNextJmpOrNop(instructions) {
    const modifiedInstructions = [...instructions]

    for (let i = replaceIndex; i < modifiedInstructions.length; i++) {
        let instruction = modifiedInstructions[i];
        var instructionType = getInstructionType(instruction);

        if (instructionType === "jmp") {
            modifiedInstructions[i] = modifiedInstructions[i].replace("jmp", "nop");
            replaceIndex = i + 1;
            break;
        }

        if (instructionType === "nop") {
            modifiedInstructions[i] = modifiedInstructions[i].replace("nop", "jmp");
            replaceIndex = i + 1;
            break;
        }
    }

    return modifiedInstructions;
}



let accumulator = 0;
let successfullyTerminated = false;
const instructions = getInstructions();
let replaceIndex = 0;

while (!successfullyTerminated) {
    let instructionIndex = 0;
    accumulator = 0;
    const executedInstructionIndexes = [];
    const modifiedInstructions = switchNextJmpOrNop(instructions)

    while (!executedInstructionIndexes.includes(instructionIndex) && instructionIndex !== modifiedInstructions.length) {
        executedInstructionIndexes.push(instructionIndex);
        var currentInstruction = getInstructionType(modifiedInstructions[instructionIndex]);
        var currentInstructionArgument = getInstructionArgument(modifiedInstructions[instructionIndex]);

        if (currentInstruction === "jmp") {
            instructionIndex += currentInstructionArgument;
        } else if (currentInstruction === "acc") {
            accumulator += currentInstructionArgument;
            instructionIndex += 1;
        } else if (currentInstruction === "nop") {
            instructionIndex += 1;
        } else {
            throw new Error(`Invalid instruction ${currentInstruction}`)
        }
    }

    if (instructionIndex === modifiedInstructions.length) {
        successfullyTerminated = true;
    }
}

console.log(accumulator);