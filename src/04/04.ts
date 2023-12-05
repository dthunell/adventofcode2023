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

const matchesOnCard = (card: Card): number => {
    let matches = 0
    for (const w of card.winning) {
        if (card.numbers.includes(w)) {
            matches++
        }
    }

    return matches
}

const getNextCards = (cards: Card[], currentIndex: number, numCards: number): Card[] => {
    const nextIndex = currentIndex + 1
    return cards.slice(nextIndex, nextIndex + numCards)
}

// const processCardsRecursive = (cards: Card[]): number => {
//     const numberOfCards: number[] = [cards.length]
//     console.log('INITIAL COUNT', numberOfCards, 'INPUT', cards)
//     for (let i = 0; i < cards.length; i++) {
//         const matches = matchesOnCard(cards[i])

//         if (matches) {
//             console.log('MATCHES', matches, 'CARDNO', cards[i].cardNo)
//             // if (i+1<cards.length) {
//             const recursiveCount = processCardsRecursive(getNextCards(cards, i, matches))
//             numberOfCards.push(recursiveCount)
//             // }
//             // else {
//             //     numberOfCards.push(1)
//             // }

//         }
//     }
//     console.log('FINAL COUNT', numberOfCards)
//     return numberOfCards.reduce(sum)
// }

const processCardsIterative = (cards: Card[][]): number => {
    let totalNumberOfCards = 0
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i].length; j++) {
            totalNumberOfCards++

            const matches = matchesOnCard(cards[i][j])

            for (let m = 0; m < matches; m++) {
                if (i + m + 1 < cards.length) {
                    cards[i + m + 1].push(cards[i + m + 1][0])
                }
            }
        }
    }
    return totalNumberOfCards
}

const a = (fileName: string): number => {
    return loadFile(fileName).split("\r\n").map(rowToCard).map(pointsOnCard).reduce(sum)
}

const b = (fileName: string): number => {
    const initialCards: Card[] = loadFile(fileName).split("\r\n").map(rowToCard)
    //return processCardsRecursive(initialCards)

    return processCardsIterative(initialCards.map(c => [c]))
}

console.log('RESULT 04A: ', a('04/input.txt'))
console.log('RESULT 04B: ', b('04/input.txt'))

export {
    a,
    b,
    rowToCard,
    pointsOnCard,
    matchesOnCard,
    getNextCards
}