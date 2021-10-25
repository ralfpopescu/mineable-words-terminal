import { ReactTerminal } from "react-terminal";
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FoundWord } from '../miner/mine'
import { BigNumber } from "@ethersproject/bignumber";
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';

const createWorker = createWorkerFactory(() => import("../miner/mine"));

const Column = styled.div`
display: flex;
flex-direction: column;
`

const options = () => 
<Column>
<span>1. Mine mwords</span>
<span>2. Read FAQ</span>
<span>3. See recently mined words</span>
<span>4. Calculate expected time to mine</span>
</Column>

type FoundWordsProps = { foundWords: FoundWord[], addFoundWord: (word: FoundWord) => void }

const FoundWords = () => {
    const worker = useWorker(createWorker);
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);

    useEffect(() => {
        (async () => {
        const foundWord = await worker.mine(BigNumber.from(0), BigNumber.from(111110), BigNumber.from(123));
        //@ts-ignore
        setFoundWords(fw => [...fw, foundWord]);
        })();
    }, [worker]);

    return <Column>
    Mining mwords...
    <div>{JSON.stringify(foundWords)}</div>
    </Column>
}


const welcomeMessage = `Welcome to MineableWords (MWORDS). Enter "options" to get started.
`

export const Terminal = () => {
  const commands = {
    options,
    "1": () => {
        return <FoundWords />
    },
    "4": `Use command "calculate-mining-time X Y", where X is your hash-rate in MH/s and Y is the length of the word you are looking for.`,
    "calculate-mining-time": (input: string) => {
        const numbers = input.split(/\s+/);

        if(numbers.length !== 2) return "Must enter exactly 2 integers."

        const hashRate = parseInt(numbers[0])
        const lengthOfWord = parseInt(numbers[1])

        if(!hashRate || !lengthOfWord || hashRate < 0 || lengthOfWord < 0) return "Must enter valid, positive, non-zero integers."
        const numberOfSeconds = (27 ^ lengthOfWord)/ hashRate * 1000000
        return `It would take you ${numberOfSeconds / 60 / 60} hours to mine a word of length ${lengthOfWord}.`
    },
    whoami: "jackharper",
    cd: (directory: string) => `changed path to ${directory}`
  };

  return (
    <ReactTerminal
      commands={commands}
      welcomeMessage={welcomeMessage}
    />
  );
}