import { solidityKeccak256 } from "ethers/lib/utils";
import { BigNumber } from "@ethersproject/bignumber";
import axios from 'axios'

let cachedData: any;
type Obj = { [key: string]: boolean }

export const getExistingWords = async (): Promise<Obj> => {
  console.log('FETCHING')
  if(cachedData) {
    console.log('cache hit')
    return cachedData;
  }
    const data = await axios.get(
        'https://api.achievemints.io/existing-words',
         { headers: {
             "Access-Control-Allow-Origin": "*",
             'Content-Type': 'application/json',
            }}
        )
    cachedData = data.data;
    return data.data;
}

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

export const getWordFromHash = (nonce: BigNumber, _address: BigNumber,) => {
  const address = BigNumber.from(_address._hex);
  const attempt = hash(address, nonce);
  const numberOfLetters = getWordLengthFromHash(attempt)

  return new Array(numberOfLetters).fill(null)
  .map((_, i) => getLetterFromHash(attempt, i))
  .reverse().join('')
}

export async function mine(
    _rangeStart: BigNumber,
    _rangeEnd: BigNumber,
    _address: BigNumber,
    lookingFor?: Obj,
  ): Promise<FoundWord[]> {
    const rangeStart = BigNumber.from(_rangeStart._hex);
    const rangeEnd = BigNumber.from(_rangeEnd._hex);
    const address = BigNumber.from(_address._hex);
    const existingWords = lookingFor ? lookingFor : await getExistingWords();
    const foundWords = [];
  
    for (let i = rangeStart; i.lt(rangeEnd); i = i.add(1)) {
      const word = getWordFromHash(address, i)

      const wordExists = existingWords[word];

      if(wordExists && word.length > 5) {
        foundWords.push({ word, i, isValid: true })
      };
    }
    return foundWords;
  }
