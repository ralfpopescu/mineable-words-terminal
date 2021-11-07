import { solidityKeccak256 } from "ethers/lib/utils";
import { BigNumber } from "@ethersproject/bignumber";

export const generateNonce = (length: number) => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1 ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    const nonce = result.join('');
   return nonce;
}

type HashInput = { address: BigNumber, nonce: BigNumber }

export const hash = ({ address, nonce }: HashInput): BigNumber => {
    const hash = solidityKeccak256(
      ["uint160", "uint96"],
      [address, nonce]
    )
    return BigNumber.from(hash);
  }

  
export const getLetterFromNumber = (index: number) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_', '!', '.', '@', '&', '?']
    return letters[index]
  }
  
  export const letterToBigNumber: { [key: string]: BigNumber } = {
    'a': BigNumber.from(0), 
    'b': BigNumber.from(1), 
    'c': BigNumber.from(2), 
    'd': BigNumber.from(3), 
    'e': BigNumber.from(4), 
    'f': BigNumber.from(5), 
    'g': BigNumber.from(6), 
    'h': BigNumber.from(7), 
    'i': BigNumber.from(8), 
    'j': BigNumber.from(9), 
    'k': BigNumber.from(10), 
    'l': BigNumber.from(11), 
    'm': BigNumber.from(12), 
    'n': BigNumber.from(13), 
    'o': BigNumber.from(14),
    'p': BigNumber.from(15), 
    'q': BigNumber.from(16), 
    'r': BigNumber.from(17), 
    's': BigNumber.from(18), 
    't': BigNumber.from(19), 
    'u': BigNumber.from(20), 
    'v': BigNumber.from(21), 
    'w': BigNumber.from(22), 
    'x': BigNumber.from(23), 
    'y': BigNumber.from(24), 
    'z': BigNumber.from(25), 
    '_': BigNumber.from(26), 
    '!': BigNumber.from(27), 
    '.': BigNumber.from(28), 
    '@': BigNumber.from(29), 
    '&': BigNumber.from(30), 
    '?': BigNumber.from(31),
  }
  
  export const getLetterFromHash = (hash: BigNumber, letterIndex: number) => {
    const masked = hash.shr(letterIndex * 5).and(BigNumber.from('0x1f'))
    const number = BigNumber.from(masked._hex).toNumber();
    return getLetterFromNumber(number);
  }

  export const toUint96 = (num: BigNumber) => {
    const mask = BigNumber.from('0xffffffffffffffffffffffff');
    return num.and(mask);
  }
  
  export const getWordLengthFromHash = (wordHash: BigNumber) => {
    const hash96 = toUint96(wordHash)
     const number = BigNumber.from(hash96.toHexString().slice(0, 3)).toNumber();
     return number;
  }
  
  export type FoundWord = { word: string, nonce: BigNumber, isValid: boolean }
  
  export const getWordFromNonceAndAddress = ({ nonce, address: _address }: HashInput) => {
    const address = BigNumber.from(_address._hex);
    const attempt = toUint96(hash({ address, nonce }));
    const numberOfLetters = getWordLengthFromHash(attempt)
  
    return new Array(numberOfLetters).fill(null)
    .map((_, i) => getLetterFromHash(attempt, i)).join(''); 
  }

  export const getWordFromHash = (hash: BigNumber) => {
    const uint96 = toUint96(hash);
    const numberOfLetters = getWordLengthFromHash(uint96)

    return new Array(numberOfLetters).fill(null)
    .map((_, i) => getLetterFromHash(uint96, i)).join(''); 
  }

  const getLengthBits = (length: number) => BigNumber.from(length).shl(92);
  
  export const getHashFromWord = (word: string): BigNumber => {
    const length = word.length;
    const lengthBits = getLengthBits(length);

    let sum = lengthBits;

    for(let i = 0; i < word.length; i += 1) {
      const char = word.charAt(i);
      const letterNumber = letterToBigNumber[char];
      const shifted = letterNumber.shl(i * 5);
      sum = sum.add(shifted)
    }
    return sum;
  }