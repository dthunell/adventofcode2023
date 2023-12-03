
import { loadFile, sum } from "../helpers"

type Board = string[][]

const isNumber = (c: string): boolean => {
  return /\d/.test(c)
}

const isSymbol = (c: string): boolean => {
  if (isNumber(c)) return false
  if (c === '.') return false

  return true
}

const findPartNumbers = (board: Board): number[] => {
  const BOARD_SIZE = board[0].length
  const partNumbers: number[] = []

  for (let x = 0; x < BOARD_SIZE; x++) {
    let maybePartNumber: string[] = []
    let foundAdjacentSymbol = false

    for (let y = 0; y < BOARD_SIZE; y++) {
      if (isNumber(board[x][y])) {
        maybePartNumber.push(board[x][y])

        if (x - 1 > 0 && y - 1 > 0 && isSymbol(board[x - 1][y - 1])) { // we can go north east
          foundAdjacentSymbol = true
        }
        if (x - 1 > 0 && isSymbol(board[x - 1][y])) { // we can go north 
          foundAdjacentSymbol = true
        }
        if (x - 1 > 0 && y + 1 < BOARD_SIZE && isSymbol(board[x - 1][y + 1])) { // we can go north east
          foundAdjacentSymbol = true
        }
        if (y - 1 > 0 && isSymbol(board[x][y - 1])) { // we can go west
          foundAdjacentSymbol = true
        }
        if (y + 1 < BOARD_SIZE && isSymbol(board[x][y + 1])) { // we can go east
          foundAdjacentSymbol = true
        }
        if (x + 1 < BOARD_SIZE && y - 1 > 0 && isSymbol(board[x + 1][y - 1])) { // we can go south west
          foundAdjacentSymbol = true
        }
        if (x + 1 < BOARD_SIZE && isSymbol(board[x + 1][y])) { // we can go south
          foundAdjacentSymbol = true
        }
        if (x + 1 < BOARD_SIZE && y + 1 < BOARD_SIZE && isSymbol(board[x + 1][y + 1])) { // we can go south east
          foundAdjacentSymbol = true
        }

        // next char is either out of bounds or a ., meaning the current number has ended
        // if we have found an adjacent symbol, save the number
        if ((y + 1 === BOARD_SIZE || board[x][y + 1] === '.' || isSymbol(board[x][y + 1]))) {
          if (foundAdjacentSymbol) {
            partNumbers.push(parseInt(maybePartNumber.join('')))
            foundAdjacentSymbol = false
          }
          maybePartNumber = []
        }
      }
    }
  }
  
  return partNumbers
}

const a = (fileName: string): number => {
  const INPUT: Board = loadFile(fileName).split("\r\n").map(row => row.split(''))
  return findPartNumbers(INPUT).reduce(sum)
}

const b = (fileName: string): number => 0

console.log('RESULT 03A: ', a('03/input.txt'))
//console.log('RESULT 03B: ', b('03/input.txt'))

export {
  a,
  b
}