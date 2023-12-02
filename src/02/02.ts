
import { loadFile, sum } from "../helpers"

type Cubes = {
  green: number,
  red: number,
  blue: number
}

type Game = {
  gameNo: number,
  draws: Cubes[]
}

const parseGame = (gameString: string): Game => {
  const [game, allDraws] = gameString.split(':')
  const draws = []
  const rawDraws = allDraws.split(';')
  const gameNo = parseInt(game.match(/[\d]+/)[0])

  for (const d of rawDraws) {
    const greenMatch = d.match(/([\d]+) green/)
    const redMatch = d.match(/([\d]+) red/)
    const blueMatch = d.match(/([\d]+) blue/)

    draws.push({
      green: greenMatch ? parseInt(greenMatch[1]) : 0,
      red:   redMatch   ? parseInt(redMatch[1])   : 0,
      blue:  blueMatch  ? parseInt(blueMatch[1])  : 0
    })
  }

  return {
    gameNo,
    draws
  }
}

const gameIsPossible = (game: Game, cubes: Cubes): boolean => {
  for (const draw of game.draws) {
    if (draw.blue > cubes.blue) return false
    if (draw.red > cubes.red) return false
    if (draw.green > cubes.green) return false
  }

  return true
}

const a = (filePath: string, cubes: Cubes): number => {
  const INPUT: string[] = loadFile(filePath).split("\r\n")
  return INPUT
    .map(parseGame)
    .filter(game => gameIsPossible(game, cubes))
    .map(game => game.gameNo)
    .reduce(sum)
}

const b = (filePath: string, cubes: Cubes): number => 0

console.log('RESULT 02A: ', a('02/input.txt', { red: 12, green: 13, blue: 14 }))

export {
  a,
  b,
  parseGame
}