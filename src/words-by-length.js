const words = require('./data/words');
const fs = require('fs');

const wordsByLength = () => {
    console.log(words.length)
    const wordsMap = [];
    words.forEach((word, i) => {
        if(i % 10000 === 0) {
            console.log(i)
        }
        if(wordsMap[word.length]) {
            wordsMap[word.length].push(word)
        } else {
            wordsMap[word.length] = [word]
        }
    })
    const data = `const wordsByLength = ${JSON.stringify(wordsMap)};
    export default wordsByLength;`
    fs.writeFileSync(`${__dirname}/data/words-by-length.ts`, data)
}

wordsByLength();