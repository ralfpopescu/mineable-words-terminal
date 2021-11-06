import { BigNumber } from "@ethersproject/bignumber";
import axios from 'axios'
import { getWordFromNonceAndAddress, FoundWord } from '../utils/word-util'

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

export async function mine(
    _rangeStart: BigNumber,
    _rangeEnd: BigNumber,
    _address: BigNumber,
    lookingFor?: Obj,
  ): Promise<FoundWord> {
    const rangeStart = BigNumber.from(_rangeStart._hex);
    const rangeEnd = BigNumber.from(_rangeEnd._hex);
    const address = BigNumber.from(_address._hex);
    const existingWords = lookingFor ? lookingFor : await getExistingWords();
    console.log('how')
  
    for (let i = rangeStart; i.lt(rangeEnd); i = i.add(1)) {
      const word = getWordFromNonceAndAddress(i, address)

      const wordExists = existingWords[word];

      if(wordExists && word.length > 5) {
        return { word, i, isValid: true }
      };
    }
    return { word: '', i : BigNumber.from(0), isValid: false }
  }
