import { BigNumber } from "@ethersproject/bignumber";
import axios from "axios";
import { getWordFromHash, hash } from "../utils/word-util";
import { hosts } from "../web3-util/config";

let cachedData: any;
type Obj = { [key: string]: boolean };

export const getExistingWords = async (): Promise<Obj> => {
  if (cachedData) {
    return cachedData;
  }
  const data = await axios.get(`${hosts.LOCAL}/existing-words.json`, {
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
  lookingForMap?: Obj
): Promise<FoundWord[]> {
  const rangeStart = BigNumber.from(_rangeStart._hex);
  const rangeEnd = BigNumber.from(_rangeEnd._hex);
  const address = BigNumber.from(_address._hex);
  const existingWords = lookingForMap ? {} : await getExistingWords();
  console.log({ lookingForMap, existingWords });
  const lookingFor = lookingForMap ? lookingForMap : {};
  const foundWords = [];

  for (let nonce = rangeStart; nonce.lt(rangeEnd); nonce = nonce.add(1)) {
    const hashed = hash({ nonce, address });
    const word = getWordFromHash(hashed);
    const wordExists = existingWords[word] || lookingFor[word];

    if (wordExists && (word.length > 4 || lookingFor[word])) {
      foundWords.push({ word, nonce, isValid: true });
    }
  }
  return foundWords;
}
