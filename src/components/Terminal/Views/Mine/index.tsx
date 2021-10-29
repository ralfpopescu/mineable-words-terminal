import { useState, useEffect } from 'react'
import styled from 'styled-components';
import ReactInterval from 'react-interval';
import { createWorkerFactory } from '@shopify/web-worker';

import { FoundWord } from '../../../../miner/mine'
import { BigNumber } from "@ethersproject/bignumber";


const createWorker = createWorkerFactory(() => import("../../../../miner/mine"));

type FoundWordsProps = { initialOffset?: BigNumber, address: BigNumber, lookingFor?: string[] }

const worker = createWorker();

const Column = styled.div`
display: flex;
flex-direction: column;
`

const setSize = 10000000


const WordAndNonce = ({ word, nonce }: { word: string, nonce: BigNumber }) => <div>{word} --- nonce: {nonce._hex}</div>

const flatten = (arr: FoundWord[]) => arr.reduce((acc, curr) => ({ ...acc, [curr.word]: curr.i._hex }), {})

export const Mine = ({ initialOffset, address, lookingFor } : FoundWordsProps) => {
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [offset, setOffset] = useState<BigNumber>(BigNumber.from(initialOffset))
    const [ellipses, setEllipses] = useState(1);
    const lookingForMap = lookingFor?.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
    const foundStorage = localStorage.getItem('found');

    useEffect(() => {
        if(!foundStorage) {
            localStorage.setItem('found', JSON.stringify(flatten(foundWords)))
        } else {
            const parsed = JSON.parse(foundStorage)
            console.log({ parsed })

            localStorage.setItem('found', JSON.stringify({ ...parsed, ...flatten(foundWords)}))
        }
    })


    useEffect(() => {
        (async () => {
            console.log('Starting miner.')
            const foundWord = await worker.mine(
                BigNumber.from(offset), 
                BigNumber.from(offset.add(setSize)), 
                address, 
                lookingForMap,
                );
            console.log(foundWord)
            //@ts-ignore
            setOffset(foundWord ? BigNumber.from(foundWord.i).add(1) : offset.add(setSize))
            if(foundWord.isValid) {
            //@ts-ignore
            setFoundWords(fw => [...fw, foundWord]);
            }
        })();
    }, [setFoundWords, offset, address, lookingForMap]);

    return (
    <Column>
        <ReactInterval timeout={500} enabled={true}
            callback={() => {
                if(ellipses > 2) setEllipses(0)
                else setEllipses(e => e + 1);
            }} />
        Mining mwords{'.'.repeat(ellipses)}
        <div>{foundWords.map(fw => <WordAndNonce word={fw.word} nonce={fw.i} />)}</div>
    </Column>
    )
}