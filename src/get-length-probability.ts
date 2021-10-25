import words from './data/words';

type WordsMap = number[];

const getLengthProbability = () => {
    console.log(words.length)
    const wordsMap: WordsMap = [];
    words.forEach((word, i) => {
        if(i % 100 === 0) {
            console.log(i)
        }
        wordsMap[word.length] = ( wordsMap[word.length] || 0) + 1;
    })
    console.log(wordsMap.map(count => count/words.length))
    console.log(wordsMap)
}

export default getLengthProbability;