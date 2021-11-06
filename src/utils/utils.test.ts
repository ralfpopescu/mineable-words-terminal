import { getWordFromHash, getHashFromWord, getWordLengthFromHash} from './word-util'
import { BigNumber } from 'ethers'

test('get hash from word', () => {
    const word = getHashFromWord('abc');
    expect(word._hex).toBe('0x300000000000000000000820')
})

test('get word length from hash', () => {
    const length = getWordLengthFromHash(BigNumber.from('0x300000000000000000000820'));
    expect(length).toBe(3)
})

test('get word from hash', () => {
    const word = getWordFromHash(BigNumber.from('0x300000000000000000000820'));
    expect(word).toBe('abc')
})
