import { ReactTerminal } from "react-terminal";
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FoundWord } from '../miner/mine'
import { BigNumber } from "@ethersproject/bignumber";
import { createWorkerFactory } from '@shopify/web-worker';
import ReactInterval from 'react-interval';
import { useWorker } from "@koale/useworker";
import { mine } from '../miner/mine'

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

const setSize = 10000000

const worker = createWorker();

const FoundWords = () => {
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [offset, setOffset] = useState<BigNumber>(BigNumber.from(0))
    const [ellipses, setEllipses] = useState(1);

    useEffect(() => {
        (async () => {
        const foundWord = await worker.mine(BigNumber.from(offset), BigNumber.from(offset.add(setSize)), BigNumber.from(123));
        console.log(foundWord)
        //@ts-ignore
        setOffset(foundWord ? BigNumber.from(foundWord.i).add(1) : offset.add(setSize))
        if(foundWord.isValid) {
        //@ts-ignore
        setFoundWords(fw => [...fw, foundWord]);
        }
        })();
    }, [worker, setFoundWords]);

    return <Column>
    <ReactInterval timeout={500} enabled={true}
          callback={() => {
              if(ellipses > 2) setEllipses(0)
              else setEllipses(e => e + 1);
          }} />
    Mining mwords{'.'.repeat(ellipses)}
    <div>{offset.toNumber()}</div>
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