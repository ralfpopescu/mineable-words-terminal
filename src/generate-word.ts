import { randomNumber } from './helpers'
import rollWordLength from './roll-word-length';

const rollLetter = () => {
    const roll = randomNumber(0, 255)

    if(roll < 10) return 'a';
    if(roll < 20) return 'b';
    if(roll < 30) return 'c';
    if(roll < 40) return 'd';
    if(roll < 50) return 'e';
    if(roll < 60) return 'f';
    if(roll < 70) return 'g';
    if(roll < 80) return 'h';
    if(roll < 90) return 'i';
    if(roll < 100) return 'j';
    if(roll < 110) return 'k';
    if(roll < 120) return 'l';
    if(roll < 130) return 'm';
    if(roll < 140) return 'n';
    if(roll < 150) return 'o';
    if(roll < 160) return 'p';
    if(roll < 170) return 'q';
    if(roll < 180) return 'r';
    if(roll < 190) return 's';
    if(roll < 200) return 't';
    if(roll < 210) return 'u';
    if(roll < 220) return 'v';
    if(roll < 230) return 'w';
    if(roll < 240) return 'x';
    if(roll < 250) return 'x';
    return 'z'
}

const generateWord = () => {
    const wordLength = rollWordLength();
    const word = new Array(wordLength).fill(null)
    return word.map(() => rollLetter()).join('')
}

export default generateWord;