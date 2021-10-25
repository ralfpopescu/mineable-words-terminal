import wordExists from './data/words-exists'
import generateWord from './generate-word'

const mineWord = () => {
    const word = generateWord();
    console.log(word);
    if(wordExists[word]) return word;
    return null;
}

export default mineWord;