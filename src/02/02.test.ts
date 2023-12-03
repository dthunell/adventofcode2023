import { describe, expect, it } from '@jest/globals';
import { a, b, parseGame } from './02'

describe('02', () => {
    describe('helpers', () => {
        it('should parse a game string', () => {
            const gameString = 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
            const parsed = parseGame(gameString)
            expect(parsed.gameNo).toBe(3)
            expect(parsed.draws.length).toBe(3)
            expect(parsed.draws[0]).toStrictEqual({ green: 8, blue: 6, red: 20 })
            expect(parsed.draws[1]).toStrictEqual({ green: 13, blue: 5, red: 4 })
            expect(parsed.draws[2]).toStrictEqual({ green: 5, blue: 0, red: 1 })
        })
    })

    describe('A', () => {
        it('should return 8 for sample when there are 12 red cubes, 13 green cubes, and 14 blue cubes', () => {
            const cubes = {
                red: 12,
                green: 13,
                blue: 14
            }
            const result = a('02/a.sample.txt', cubes)
            expect(result).toBe(8)
        })
    })

    describe('B', () => {
        it('should return 2286 for sample', () => {
            const result = b('02/b.sample.txt')
            expect(result).toBe(2286)
        })
    })
})
