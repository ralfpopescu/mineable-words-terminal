import wordLengthCount from "./data/word-length-count";
import words from './data/words'

const getBucket = (roll: number) => {
    let index = 0;
    let sum = 0;
    while(sum < roll) {
        sum += wordLengthCount[index];
        index += 1;
    }
    return index;
}

export const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

const rollWordLength = () => {
    const lengthRoll = randomNumber(0, words.length);
    return getBucket(lengthRoll)
}

export default rollWordLength;