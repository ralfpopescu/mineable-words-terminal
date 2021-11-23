import { BigNumber } from "@ethersproject/bignumber";
import axios from "axios";
import {
  normalizeWordHash,
  hash,
  wordMapToHashMap,
  getWordLengthFromHash,
  getWordFromHash,
} from "../utils/word-util";
import { hosts } from "../web3-util/config";

let cachedData: any;
type Obj = { [key: string]: boolean };

export const getExistingWords = async (): Promise<Obj> => {
  if (cachedData) {
    return cachedData;
  }
  const data = await axios.get(`${hosts.PROD}/hashed-words.json`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  cachedData = data.data;
  return cachedData;
};

export type FoundWord = { word: string; nonce: BigNumber; isValid: boolean };

export async function mine(
  _rangeStart: BigNumber,
  _rangeEnd: BigNumber,
  _address: BigNumber,
  lookingForMap?: { [key: string]: true }
): Promise<FoundWord[]> {
  const rangeStart = BigNumber.from(_rangeStart._hex);
  const rangeEnd = BigNumber.from(_rangeEnd._hex);
  const address = BigNumber.from(_address._hex);
  const existingWords = lookingForMap ? {} : await getExistingWords();
  const lookingFor = lookingForMap ? wordMapToHashMap({ wordMap: lookingForMap }) : {};
  const foundWords = [];
  console.log({ lookingForMap, lookingFor, existingWords });

  for (let nonce = rangeStart; nonce.lt(rangeEnd); nonce = nonce.add(1)) {
    const hashed = hash({ nonce, address });
    const word = normalizeWordHash(hashed);
    const wordLength = getWordLengthFromHash(hashed);
    const wordExists = existingWords[word._hex] || lookingFor[word._hex];

    if (wordExists && (wordLength > 5 || lookingFor[word._hex])) {
      foundWords.push({ word, nonce, isValid: true });
    }
  }
  return foundWords.map((fw) => ({ ...fw, word: getWordFromHash(fw.word) }));
}
