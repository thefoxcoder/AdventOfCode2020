fs = require("fs");

function getInput(){
    let input = fs.readFileSync("day5_input.txt", "utf8").trim();
    return input.split(/\r?\n/)
}

function getRow(boardingPass){
    const rowCharacters = boardingPass.substring(0, 7);
    const rowBinary = rowCharacters.replace(/F/g, 0).replace(/B/g, 1);
    const rowDecimal = parseInt(rowBinary, 2);

    if(isNaN(rowDecimal)){
        throw new Error(`Invalid input: ${boardingPass}`)
    }

    return rowDecimal;
}

function getColumn(boardingPass){
    const columnCharacters = boardingPass.substring(7, 10);
    const columnBinary = columnCharacters.replace(/L/g, 0).replace(/R/g, 1);
    const columnDecimal = parseInt(columnBinary, 2);

    if(isNaN(columnDecimal)){
        throw new Error(`Invalid input: ${boardingPass}`)
    }

    return columnDecimal;
}

function getSeatId(boardingPass){
    const row = getRow(boardingPass);
    const column = getColumn(boardingPass);

    return (row * 8) + column; 
}

const boardingPasses = getInput();
const seatIds = boardingPasses.map(getSeatId).sort()

const candidates = []

for(let i = 0; i < seatIds.length - 1; i++ ){
    if(seatIds[i + 1] - seatIds[i] === 2){
        candidates.push(seatIds[i], seatIds[i + 1])
    }
}

console.table(candidates)