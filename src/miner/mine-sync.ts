import { solidityKeccak256 } from "ethers/lib/utils";
import { BigNumber } from "@ethersproject/bignumber";
import wordExists from './word-exists'

export const getLetterFromNumber = (roll: number) => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
  'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const index = Math.floor(roll / 10);
  return letters[index]
}

export function hash(
  address: BigNumber,
  nonce: BigNumber
): BigNumber {
  const hash = solidityKeccak256(
    ["uint160", "uint96"],
    [address, nonce]
  )

  return BigNumber.from(hash);
}

const getLetterFromHash = (hash: BigNumber, letterIndex: number) => {
  //preappends 0x
  const hashString = hash.toHexString();
  const startIndex =  hashString.length - (letterIndex + 1) * (2)
  const endIndex =  hashString.length - (letterIndex) * (2)
  const hexNumber = `0x${hashString.slice(startIndex, endIndex)}`;
  const number = BigNumber.from(hexNumber).toNumber();
  return getLetterFromNumber(number);
}

const  getWordLengthFromHash = (wordHash: BigNumber) => {
  //first 16 bits used for length, so 6 chars 0x1234
  const roll = BigNumber.from(wordHash.toHexString().slice(0, 6)).toNumber();
 
  if(roll < 1) return 1;
  if(roll < 31) return 2;
  if(roll < 348) return 3;
  if(roll < 1686) return 4;
  if(roll < 4749) return 5;
  if(roll < 10177) return 6;
  if(roll < 18239) return 7;
  if(roll < 28081) return 8;
  if(roll < 38064) return 9;
  if(roll < 46750) return 10;
  if(roll < 53557) return 11;
  if(roll < 58509) return 12;
  if(roll < 61893) return 13;
  if(roll < 64123) return 14;
  return 15;
}

export type FoundWord = { word: string, i: BigNumber, isValid: boolean }

export function mine(
    _address: BigNumber,
    count: BigNumber,
    setCount: (n: BigNumber) => void,
  ): FoundWord[] {
    const address = BigNumber.from(_address._hex);
    const set = 4000;
    const countNumber = count.toNumber()
    const total: FoundWord[] = [];

    for(let i = countNumber * set; i < (countNumber + 1 )* set; i += 1) {
      const attempt = hash(address, count);
      const numberOfLetters = getWordLengthFromHash(attempt)

      const word = new Array(numberOfLetters).fill(null)
      .map((_, i) => getLetterFromHash(attempt, i))
      .reverse().join('')

      total.push({ word, i: count, isValid: wordExists[word] })
    }
    setCount(count.add(1));
    return total;
  }
