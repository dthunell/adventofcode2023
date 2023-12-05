import { describe, expect, it } from '@jest/globals';
import { a, b, rowToCard, pointsOnCard, matchesOnCard, getNextCards } from './04'

describe('04', () => {
    describe('helper', () => {
        it('should parse card', () => {
            const row = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const card = rowToCard(row)
            const expected = {
                cardNo: 1,
                winning: [41, 48, 83, 86, 17],
                numbers: [83, 86,  6, 31, 17,  9, 48, 53]
            }
            expect(card).toStrictEqual(expected)
        })
        it('should be worth 8 points', () => {
            const row = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const card = rowToCard(row)
            const point = pointsOnCard(card)
            expect(point).toBe(8)
        })
        it('should be have 4 matches', () => {
            const row = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const card = rowToCard(row)
            const point = matchesOnCard(card)
            expect(point).toBe(4)
        })
        
        it('should return next 2 cards', () => {
            const row1 = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const row2 = 'Card 2: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const row3 = 'Card 3: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const cards = [rowToCard(row1), rowToCard(row2), rowToCard(row3) ]
            const nextCards = getNextCards(cards, 0, 2)
            expect(nextCards.length).toBe(2)
        })

        it('should return last card', () => {
            const row1 = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const row2 = 'Card 2: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const row3 = 'Card 3: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
            const cards = [rowToCard(row1), rowToCard(row2), rowToCard(row3) ]
            const nextCards = getNextCards(cards, 1, 2)
            expect(nextCards.length).toBe(1)
        })
    })

    describe('A', () => {
        it('should return 13 for sample', () => {
            const result = a('04/a.sample.txt')
            expect(result).toBe(13)
        })
    })

    describe('B', () => {
        it('should return 30 for sample', () => {
            const result = b('04/b.sample.txt')
            expect(result).toBe(30)
        })
    })
})
