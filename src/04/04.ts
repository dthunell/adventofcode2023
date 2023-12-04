import { loadFile, sum, isNumber } from '../helpers'

type Card = {
    cardNo: number,
    numbers: number[],
    winning: number[]
}

const rowToCard = (s: string): Card => {
    const [cardNoString, gameString] = s.split(':')
    const [winningString, numberString] = gameString.split('|')
    return {
        cardNo: parseInt(cardNoString.match(/[\d]+/)[0]),
        numbers: numberString.split(' ').filter(isNumber).map(n => parseInt(n)),
        winning: winningString.split(' ').filter(isNumber).map(n => parseInt(n))
    }
}

const pointsOnCard = (card: Card): number => {
    const points: number[] = []
    for (const w of card.winning) {
        if (card.numbers.includes(w)) {
            points.push(points.length ? 2 : 1) // first point (length 0) is 1p rest 2p
        }
    }
    if (points.length === 0) {
        return 0
    }
    
    return points.reduce((m, n) => m * n)
}

const a = (fileName: string): number => {
    return loadFile(fileName).split("\r\n").map(rowToCard).map(pointsOnCard).reduce(sum)

}
const b = (fileName: string): number => {
    return 0
}

console.log('RESULT 04A: ', a('04/input.txt'))
// console.log('RESULT 04B: ', b('04/input.txt'))

export {
    a,
    b,
    rowToCard,
    pointsOnCard
}