/* eslint-disable */
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import ReactInterval from 'react-interval';
import MiningController from "./MiningController"; 
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useLocation } from 'react-router-dom'
import { getQueryParamsFromSearch } from '../../../../utils'

import { FoundWord } from '../../../../utils/word-util'
import { BigNumber } from "@ethersproject/bignumber";

export enum MiningStatus {
    WAITING_TO_START,
    STARTED,
    WAITING_TO_STOP,
    STOPPED,
  }

export type MineProps = { 
    initialOffset?: BigNumber, 
    lookingFor?: string[],
    workerCount?: number, 
    minerId: string,
}

const Column = styled.div`
display: flex;
flex-direction: column;
`

const WordAndNonce = ({ word, nonce }: { word: string, nonce: BigNumber }) => <div>{word} --- nonce: {nonce._hex}</div>

const flatten = (arr: FoundWord[]) => arr.reduce((acc, curr) => ({ ...acc, [curr.word]: curr.nonce._hex }), {})

export const Mine = ({ initialOffset, lookingFor, workerCount, minerId} : MineProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [ellipses, setEllipses] = useState(1);
    const location = useLocation();
    const queryParams = getQueryParamsFromSearch(location.search)
    console.log({ queryParams, minerId })

    //@ts-ignore
    const miningStatus: any = queryParams[minerId] ? parseInt(queryParams[minerId]) : MiningStatus.STOPPED;
      
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
    const stop = async () => {
        if(miningController) {
            await miningController.terminate();
            setMiningController(null)
            setHashRate(0);
        }
    };
    const onWordsFound = (words: FoundWord[]) => {
        setFoundWords(w => [...w, ...words]);
    };

    let controller: any;

    if (miningStatus === MiningStatus.STOPPED) {
        console.log('waiting to stop', { miningController })
      stop();
    } else if (miningStatus === MiningStatus.WAITING_TO_START) {
      controller = new MiningController({
        library: library!,
        address: account!,
        workerCount: workerCount || 4,
        onWordsFound,
        updateHashRate: setHashRate,
        lookingFor,
        startingNonce: initialOffset,
      });

      console.log('the heck', MiningStatus)
      setMiningController(controller);
      controller.start().catch((e: any) => {
        console.log("Error mining: " + e);
        stop();
      });
    }

    return () => {
        console.log('unmount')
        controller?.terminate();
        setMiningController(null)
        setHashRate(0);
    };
    //eslint-ignore-
  }, [miningStatus]);

  if(miningStatus === MiningStatus.STOPPED) return (
    <Column>
        <div>{foundWords.map(fw => <WordAndNonce word={fw.word} nonce={fw.nonce} />)}</div>
        <div>Miner stopped. Type "found" to see words you have found.</div>
    </Column>
  )

    return (
    <Column>
        <ReactInterval timeout={500} enabled={true}
            callback={() => {
                if(ellipses > 2) setEllipses(0)
                else setEllipses(e => e + 1);
            }} />
        {hashRate ? <div>Mining mwords{'.'.repeat(ellipses)}</div> : <div>Starting up the miner...</div>}
        {<div>Hash rate: ~{hashRate || '???'} h/s</div>}
        <div>{foundWords.map(fw => 
        //@ts-ignore
            console.log({ fw }) || <WordAndNonce word={fw.word} nonce={fw.nonce} />)}</div>
    </Column>
    )
}
