import { loadFile, sum } from "../helpers"
const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const findFirstNumber = (s: string): number => {
  const match = s.match(/[\d]{1}/)
  if (match) {
    return parseInt(match[0], 10)
  }

  throw new Error('No number in string')
}

const findLastNumber = (s: string): number => {
  const match = s.match(/[\d]{1}/g)
  if (match) {
    return parseInt(match[match.length - 1], 10)
  }

  throw new Error('No number in string')
}

const concatRowNumbers = (s: string): number => {
  const first = findFirstNumber(s)
  const last = findLastNumber(s)
  return parseInt(`${first}${last}`, 10)
}

const replaceDigits = (s: string): string => {
  let processing = s
  const replaced: string[] = []

  while (processing.length) {
    let hasReplaced = false
    for (let i = 1; i < digits.length; i++) {
      if (processing.match(new RegExp(`^${digits[i]}`))) {
        replaced.push(i.toString())
        hasReplaced = true
        break
      }
    }

    if (!hasReplaced) {
      replaced.push(processing.substring(0, 1))
    }

    processing = processing.substring(1)
  }

  return replaced.join('')
}

const a = (fileName: string): number => {
  const INPUT: string[] = loadFile(fileName).split("\r\n")
  return INPUT.map(concatRowNumbers).reduce(sum)
}

const b = (fileName: string): number => {
  const INPUT: string[] = loadFile(fileName).split("\r\n")
  return INPUT.map(replaceDigits).map(concatRowNumbers).reduce(sum)
}

console.log('RESULT 01A: ', a('01/input.txt'))
console.log('RESULT 01B: ', b('01/input.txt'))

export {
  a,
  b
}