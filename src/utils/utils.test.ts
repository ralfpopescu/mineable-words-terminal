import { getWordFromHash, getHashFromWord, getWordLengthFromHash, hash } from './word-util'
import { BigNumber } from 'ethers'

const address = BigNumber.from('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')

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

test('bingo', () => {
    const nonce = BigNumber.from('0x3d5ad800089945');
    const hashed = hash({ address, nonce })
    expect(hashed._hex).toBe('0xb8217be979510f2200d729e54f7ef27ce48fbaa654fcca64cbdfc151c2e33501')
    const bingo = getWordFromHash(hashed)
    expect(bingo).toBe('bingo')
})

