import { loadFile, sum } from "../helpers"
const digits = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ]

const findFirstNumber = (s: string): number => {
    const match = s.match(/[\d{1}]/)
    if (match) {
        return parseInt(match[0], 10)
    }

    throw new Error('No number in string')
}

const findLastNumber = (s: string): number => {
    const match = s.match(/[\d{1}]/g)
    if (match) {
        return parseInt(match[match.length-1], 10)
    }

    throw new Error('No number in string')
}

const concatRowNumbers = (s: string): number => {
    const first = findFirstNumber(s)
    const last = findLastNumber(s)
    return parseInt(`${first}${last}`, 10)
}

const replaceDigits = (s: string): string => {
    let replaced = s //.toLowerCase()
    const result: string[] = []
    
    while (replaced.length) {
        for (let i=1; i < digits.length; i++) {
            replaced = replaced.replace(new RegExp(`^${digits[i]}`), i.toString())
        }
        result.push(replaced.substring(0, 1))
        replaced = replaced.substring(1)
    }
    
    return result.join('')
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