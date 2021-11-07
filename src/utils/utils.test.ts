import { getWordFromHash, getHashFromWord, getWordLengthFromHash, hash } from './word-util'
import { BigNumber } from 'ethers'

const address = BigNumber.from('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')

const abc = '0x3004400000000000000000';

test('test hash is right length', () => {
    expect(abc.length).toBe(24);
})

test('get hash from word', () => {
    const word = getHashFromWord('abc');
    expect(word._hex).toBe(abc)
})

test('get word length from hash', () => {
    const length = getWordLengthFromHash(BigNumber.from(abc));
    expect(length).toBe(3)
})

test('get word from hash', () => {
    const word = getWordFromHash(BigNumber.from(abc));
    expect(word).toBe('abc')
})

test('borax', () => {
    const nonce = BigNumber.from('0x5235');
    const hashed = hash({ address, nonce })
    expect(hashed._hex).toBe('0x3307dbe6e0190d8fec56ae48e7983f07c664ce2fa650ba20be2affd6105c0e95')
    const borax = getWordFromHash(hashed)
    expect(borax).toBe('borax')
})

