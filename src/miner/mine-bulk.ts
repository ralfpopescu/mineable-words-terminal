import { BigNumber } from "@ethersproject/bignumber";
import axios from 'axios'
import { getWordFromHash, hash } from "../utils/word-util";

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

export type FoundWord = { word: string, nonce: BigNumber, isValid: boolean }

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
  
    for (let nonce = rangeStart; nonce.lt(rangeEnd); nonce = nonce.add(1)) {
      const hashed = hash({ nonce, address })
      const word = getWordFromHash(hashed)
      const wordExists = existingWords[word];

      if(wordExists && word.length > 4) {
        console.log({ word, nonce, hashed })
        foundWords.push({ word, nonce, isValid: true })
      };
    }
    return foundWords;
  }
