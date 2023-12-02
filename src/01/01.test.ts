import {describe, expect, it} from '@jest/globals';
import { a, b } from './01'

describe('01', () => {
    describe('A', () => {
        it('should return 142 for sample', () => {
            const result = a('01/a.sample.txt')
            expect(result).toBe(142)
        })
    })

    describe('B', () => {
        it('should return 281 for sample', () => {
            const result = b('01/b.sample.txt')
            expect(result).toBe(281)
        })
    })
})