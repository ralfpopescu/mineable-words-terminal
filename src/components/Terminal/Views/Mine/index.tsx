import { useState, useEffect } from 'react'
import styled from 'styled-components';
import ReactInterval from 'react-interval';
import { createWorkerFactory } from '@shopify/web-worker';
import MiningController from "./MiningController"; 
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { FoundWord } from '../../../../miner/mine'
import { BigNumber } from "@ethersproject/bignumber";

const createWorker = createWorkerFactory(() => import("../../../../miner/mine"));

type FoundWordsProps = { 
    initialOffset?: BigNumber, 
    address: BigNumber, 
    lookingFor?: string[],
    workerCount?: number, 
}

const worker = createWorker();

const Column = styled.div`
display: flex;
flex-direction: column;
`

const setSize = 10000000

enum MiningStatus {
    WAITING_TO_START,
    STARTED,
    WAITING_TO_STOP,
    STOPPED,
  }

const WordAndNonce = ({ word, nonce }: { word: string, nonce: BigNumber }) => <div>{word} --- nonce: {nonce._hex}</div>

const flatten = (arr: FoundWord[]) => arr.reduce((acc, curr) => ({ ...acc, [curr.word]: curr.i._hex }), {})

export const Mine = ({ initialOffset, address, lookingFor, workerCount } : FoundWordsProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [ellipses, setEllipses] = useState(1);
    const [miningStatus, setMiningStatus] = useState<MiningStatus>(
        MiningStatus.WAITING_TO_START
      );
      
    const [miningController, setMiningController] =
    useState<MiningController | null>(null);
    const [hashRate, setHashRate] = useState(0);

    const foundStorage = localStorage.getItem('found');

    useEffect(() => {
        if(!foundStorage) {
            localStorage.setItem('found', JSON.stringify(flatten(foundWords)))
        } else {
            console.log('Updating local storage')
            const parsed = JSON.parse(foundStorage)
            localStorage.setItem('found', JSON.stringify({ ...parsed, ...flatten(foundWords)}))
        }
    }, [foundWords, foundStorage])


    useEffect(() => {
    const stop = () => {
      miningController?.terminate();
      setMiningController(null);
      setMiningStatus(MiningStatus.STOPPED);
      setHashRate(0);
    };
    const onWordsFound = (words: FoundWord[]) => {
        setFoundWords(w => [...w, ...words]);
    };

    if (miningStatus === MiningStatus.WAITING_TO_STOP) {
      stop();
    } else if (miningStatus === MiningStatus.WAITING_TO_START) {
      const controller = new MiningController({
        library: library!,
        address: account!,
        workerCount: workerCount || 1,
        onWordsFound,
        updateHashRate: setHashRate,
        lookingFor,
        startingNonce: initialOffset,
      });

      setMiningController(controller);
      controller.start().catch((e) => {
        console.log("Error mining: " + e);
        stop();
      });

      setMiningStatus(MiningStatus.STARTED);
    }

    return () => {
      miningController?.terminate();
    };
  }, [miningStatus, library, account, miningController, workerCount, initialOffset, lookingFor]);

    return (
    <Column>
        <ReactInterval timeout={500} enabled={true}
            callback={() => {
                if(ellipses > 2) setEllipses(0)
                else setEllipses(e => e + 1);
            }} />
        <div>Mining mwords{'.'.repeat(ellipses)}</div>
        <div>Hash rate: {hashRate} h/s</div>
        <div>{foundWords.map(fw => <WordAndNonce word={fw.word} nonce={fw.i} />)}</div>
    </Column>
    )
}