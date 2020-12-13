fs = require("fs");

let currentSeatMap = fs.readFileSync("day11_input.txt", "utf8")
    .trim()
    .split(/\r?\n/)
    .map((x) => x.split(''));

const rowLength = currentSeatMap[0].length;
const rows = currentSeatMap.length;

const empty = 'L'
const occupied = '#'
const floor = '.'

function getAdjacentElements(matrix, x, y) {
    const xStart = x > 0 ? x - 1 : x;
    const xEnd = x < rowLength - 1 ? x + 1 : x

    const yStart = y > 0 ? y - 1 : y;
    const yEnd = y < rows - 1 ? y + 1 : y;

    const adjacentElements = []
    for (let i = yStart; i <= yEnd; i++) {
        for (let j = xStart; j <= xEnd; j++) {
            if (i !== y || j !== x) {
                adjacentElements.push(matrix[i][j])
            }
        }
    }

    return adjacentElements
}


function applyRules(seatMap) {
    const newSeatMap = seatMap.map(x => [...x])

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rowLength; x++) {
            const currentSeat = seatMap[y][x]

            if (currentSeat === floor) {
                continue
            }
            const adjacentElements = getAdjacentElements(seatMap, x, y)

            if(currentSeat === occupied && adjacentElements.filter(x => x === occupied).length >= 4){
                newSeatMap[y][x] = empty
            } else if (currentSeat === empty && adjacentElements.every(x => x !== occupied)){
                newSeatMap[y][x] = occupied
            }
        }
    }

    return newSeatMap
}

function areEqual(currentSeatMap, newSeatMap){
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < rowLength; x++){
            if(currentSeatMap[y][x] !== newSeatMap[y][x]){
                return false;
            }
        }
    }

    return true;
}

let hasStabilized = false;

do {
    const newSeatMap  = applyRules(currentSeatMap)
    hasStabilized = areEqual(currentSeatMap, newSeatMap)
    currentSeatMap = newSeatMap
} while(!hasStabilized);

const occupiedSeats = currentSeatMap
    .reduce((a, b) => a.concat(b), [])
    .filter(x => x === occupied)

console.log(occupiedSeats.length)
