import { describe, expect, it } from '@jest/globals';
import { a, b } from './03'

describe('03', () => {
    describe('A', () => {
        it('should return 4361 for sample', () => {
            const result = a('03/a.sample.txt')
            expect(result).toBe(4361)
        })
    })

    describe.skip('B', () => {
        it('should return 467835 for sample', () => {
            const result = b('03/b.sample.txt')
            expect(result).toBe(467835)
        })
    })
})
