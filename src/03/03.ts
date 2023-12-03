
import { loadFile, sum } from '../helpers'
import { uniq } from 'lodash'

type Board = string[][]
type Part = {
  num: number
  adjacentGears: string[] // x_y
}
type Gears = {
  [s: string]: number[]
}

const isNumber = (c: string): boolean => /\d/.test(c)
const isGear = (c: string): boolean => c === '*'
const isSymbol = (c: string): boolean => {
  if (isNumber(c)) return false
  if (c === '.') return false

  return true
}

const findPartNumbers = (board: Board): Part[] => {
  const BOARD_SIZE = board[0].length
  const partNumbers: Part[] = []

  for (let x = 0; x < BOARD_SIZE; x++) {
    let maybePartNumber: string[] = []
    let foundAdjacentSymbol = false
    let adjacentGears: string[] = []
    
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (isNumber(board[x][y])) {
        maybePartNumber.push(board[x][y])

        if (x - 1 > 0 && y - 1 > 0 && isSymbol(board[x - 1][y - 1])) { // we can go north east
          foundAdjacentSymbol = true
          if (isGear(board[x - 1][y - 1])) { adjacentGears.push(`${x-1}_${y-1}`) }
        }
        if (x - 1 > 0 && isSymbol(board[x - 1][y])) { // we can go north 
          foundAdjacentSymbol = true
          if (isGear(board[x - 1][y])) { adjacentGears.push(`${x-1}_${y}`) }
        }
        if (x - 1 > 0 && y + 1 < BOARD_SIZE && isSymbol(board[x - 1][y + 1])) { // we can go north east
          foundAdjacentSymbol = true
          if (isGear(board[x - 1][y + 1])) { adjacentGears.push(`${x-1}_${y+1}`) }
        }
        if (y - 1 > 0 && isSymbol(board[x][y - 1])) { // we can go west
          foundAdjacentSymbol = true
          if (isGear(board[x][y - 1])) { adjacentGears.push(`${x}_${y-1}`) }
        }
        if (y + 1 < BOARD_SIZE && isSymbol(board[x][y + 1])) { // we can go east
          foundAdjacentSymbol = true
          if (isGear(board[x][y + 1])) { adjacentGears.push(`${x}_${y+1}`) }
        }
        if (x + 1 < BOARD_SIZE && y - 1 > 0 && isSymbol(board[x + 1][y - 1])) { // we can go south west
          foundAdjacentSymbol = true
          if (isGear(board[x + 1][y - 1])) { adjacentGears.push(`${x+1}_${y-1}`) }
        }
        if (x + 1 < BOARD_SIZE && isSymbol(board[x + 1][y])) { // we can go south
          foundAdjacentSymbol = true
          if (isGear(board[x + 1][y])) { adjacentGears.push(`${x+1}_${y}`) }
        }
        if (x + 1 < BOARD_SIZE && y + 1 < BOARD_SIZE && isSymbol(board[x + 1][y + 1])) { // we can go south east
          foundAdjacentSymbol = true
          if (isGear(board[x + 1][y + 1])) { adjacentGears.push(`${x+1}_${y+1}`) }
        }

        // next char is either out of bounds or a ., meaning the current number has ended
        // if we have found an adjacent symbol, save the number
        if ((y + 1 === BOARD_SIZE || board[x][y + 1] === '.' || isSymbol(board[x][y + 1]))) {
          if (foundAdjacentSymbol) {
            partNumbers.push({
              num: parseInt(maybePartNumber.join('')),
              adjacentGears: uniq(adjacentGears),
            })
            foundAdjacentSymbol = false
          }
          maybePartNumber = []
          adjacentGears = []
        }
      }
    }
  }
  
  return partNumbers
}

const extractGears = (parts: Part[]): Gears => {
  const gears: Gears = {}

  for (const part of parts) {
    for (const gear of part.adjacentGears)
    if (Array.isArray(gears[gear])) { 
      gears[gear].push(part.num) 
    } 
    else {
      gears[gear] = [part.num] 
    }
  }

  return gears
}

const calculateGearRatios = (gears: Gears): number[] => {
  const ratios: number[] = []

  for (const key in gears) {
    if (gears[key].length === 2) {
      ratios.push(gears[key][0] * gears[key][1])
    }
  }

  return ratios
}

const a = (fileName: string): number => {
  const INPUT: Board = loadFile(fileName).split("\r\n").map(row => row.split(''))
  return findPartNumbers(INPUT).map(part => part.num).reduce(sum)
}

const b = (fileName: string): number => {
  const INPUT: Board = loadFile(fileName).split("\r\n").map(row => row.split(''))
  const partsWithAdjacentSymbols = findPartNumbers(INPUT).filter(p => p.adjacentGears.length)
  const gears = extractGears(partsWithAdjacentSymbols)
  const gearRatios = calculateGearRatios(gears)
  return gearRatios.reduce(sum)
}

console.log('RESULT 03A: ', a('03/input.txt'))
console.log('RESULT 03B: ', b('03/input.txt'))

export {
  a,
  b
}