import { ReactTerminal } from "react-terminal";
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FoundWord, getWordFromHash } from '../miner/mine'
import { BigNumber } from "@ethersproject/bignumber";
import { createWorkerFactory } from '@shopify/web-worker';
import ReactInterval from 'react-interval';
import { FAQ } from './FAQ'
import { RecentlyMinedWords } from './RecentlyMinedWords'
import { DiscordIcon } from './DiscordIcon'

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

const setSize = 10000000

const worker = createWorker();

const WordAndNonce = ({ word, nonce }: { word: string, nonce: BigNumber }) => <div>{word} --- nonce: {nonce._hex}</div>

type FoundWordsProps = { initialOffset?: number }

const address = BigNumber.from(123);

const FoundWords = ({ initialOffset } : FoundWordsProps) => {
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [offset, setOffset] = useState<BigNumber>(BigNumber.from(0))
    const [ellipses, setEllipses] = useState(1);

    useEffect(() => {
        (async () => {
        const foundWord = await worker.mine(BigNumber.from(offset), BigNumber.from(offset.add(setSize)), address);
        console.log(foundWord)
        //@ts-ignore
        setOffset(foundWord ? BigNumber.from(foundWord.i).add(1) : offset.add(setSize))
        if(foundWord.isValid) {
        //@ts-ignore
        setFoundWords(fw => [...fw, foundWord]);
        }
        })();
    }, [worker, setFoundWords, offset]);

    return <Column>
    <ReactInterval timeout={500} enabled={true}
          callback={() => {
              if(ellipses > 2) setEllipses(0)
              else setEllipses(e => e + 1);
          }} />
    Mining mwords{'.'.repeat(ellipses)}
    <div>{foundWords.map(fw => <WordAndNonce word={fw.word} nonce={fw.i} />)}</div>
    </Column>
}

const splitOnSpaces = (input: string) => input.split(/\s+/);

const welcomeMessage = `Welcome to MineableWords (MWORDS). Enter "options" to get started.
`

export const Terminal = () => {
    const [stagedNonce, setStagedNonce] = useState<BigNumber | null>()

  const commands = {
    options,
    "1": () => `To start mining mwords, use command "mine X", where X is the number you want to start.`,
    "2": () => <FAQ />,
    "3": () => <RecentlyMinedWords />,
    "4": `Use command "calculate-mining-time X Y", where X is your hash-rate in MH/s and Y is the length of the word you are looking for.`,
    "calculate-mining-time": (input: string) => {
        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter exactly 2 integers."

        const hashRate = parseInt(options[0])
        const lengthOfWord = parseInt(options[1])

        if(!hashRate || !lengthOfWord || hashRate < 0 || lengthOfWord < 0) return "Must enter valid, positive, non-zero integers."
        const numberOfSeconds = (27 ^ lengthOfWord)/ hashRate * 1000000
        return `It would take you ${numberOfSeconds / 60 / 60} hours to mine a word of length ${lengthOfWord}.`
    },
    link: "Linking your wallet...",
    mine: (input: string) => {
        const options = splitOnSpaces(input);
        const offset = parseInt(options[0])

        return <FoundWords initialOffset={offset || 0} />
    },
    mint: (input: string) => {
        const options = splitOnSpaces(input);
        console.log({ options })

        if(options.length !== 1) return "Must enter a single nonce."

        const stringNonce = options[0]

        try {
            const nonce = BigNumber.from(stringNonce)
            const word = getWordFromHash(nonce, address)
            setStagedNonce(nonce);
            return `This nonce will mint the word "${word}". Do you want to proceed? y/n`
        } catch (e) {
            return `Invalid nonce.`
        }
        
    },
    y: () => {
        if(stagedNonce) {
            const word = getWordFromHash(stagedNonce, address)
            return `Minting ${word}...`
        }
    },
    n: () => {
        if(stagedNonce) {
            setStagedNonce(null)
        }
    },
  };

  return (
    <ReactTerminal
      commands={commands}
      welcomeMessage={welcomeMessage}
    />
  );
}