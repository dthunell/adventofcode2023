import { describe, expect, it } from '@jest/globals';
import { a, b, rowToCard, pointsOnCard } from './04'

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
    })

    describe('A', () => {
        it('should return 13 for sample', () => {
            const result = a('04/a.sample.txt')
            expect(result).toBe(13)
        })
    })

    // describe.skip('B', () => {
    //     it('should return 467835 for sample', () => {
    //         const result = b('03/b.sample.txt')
    //         expect(result).toBe(467835)
    //     })
    // })
})
