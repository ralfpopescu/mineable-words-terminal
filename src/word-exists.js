const words = require('./data/words');
const fs = require('fs');

const wordExists = () => {
    console.log(words.length)
    const wordsMap = {};
    words.forEach((word, i) => {
        wordsMap[word] = true;
    })
    const data = `const wordExists = ${JSON.stringify(wordsMap)};
    export default wordExists;`
    fs.writeFileSync(`${__dirname}/data/words-exists.ts`, data)
}

wordExists();