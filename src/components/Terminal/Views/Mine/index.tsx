/* eslint-disable */
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import ReactInterval from 'react-interval';
import MiningController from "./MiningController"; 
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useLocation } from 'react-router-dom'
import { getQueryParamsFromSearch } from '../../../../utils'
import { getCurrentBounties } from '../../../../web3-util/methods'

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
    bountyHunt: boolean;
}

const Column = styled.div`
display: flex;
flex-direction: column;
`

const Row = styled.div`
display: flex;
flex-direction: row;
`

const getFoundMessage = (foundWords: any[]) => {
    if(foundWords.length === 0) return `You haven't found any words yet in this mining session. Use command "found" to see words from past sessions.`
    if(foundWords.length === 1) return `You have found a word this session. Use command "found" to see it.`
    return `You have found ${foundWords.length} words this session. Use command "found" to see all words you have found.`
}

const WordAndNonce = ({ word, nonce }: { word: string, nonce: BigNumber }) => <div>{word} --- nonce: {nonce._hex}</div>

const flatten = (arr: FoundWord[]) => arr.reduce((acc, curr) => ({ ...acc, [curr.word]: curr.nonce._hex }), {})

export const Mine = ({ initialOffset, lookingFor, workerCount, minerId, bountyHunt } : MineProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [ellipses, setEllipses] = useState(1);
    const [allLookingFor, setAllLookingFor] = useState<string[] | undefined>();
    const location = useLocation();
    const queryParams = getQueryParamsFromSearch(location.search)

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

    const start = async () => {
        if (miningStatus === MiningStatus.STOPPED) {
            console.log('waiting to stop', { miningController })
          stop();
        } else if (miningStatus === MiningStatus.WAITING_TO_START) {
            let bounties;
            if(bountyHunt) {
                bounties = await getCurrentBounties({ library: library! });
            }

        let lookingForCoalesced: string[] | undefined = (bounties || lookingFor) ? [] : undefined;
        
        if(lookingForCoalesced) {
            if(bounties) {
                lookingForCoalesced = bounties.map(b => b.decoded);
            }
            if(lookingFor) {
                lookingForCoalesced = [...lookingForCoalesced, ...lookingFor]
            }
        }

        setAllLookingFor(lookingForCoalesced)
    
          controller = new MiningController({
            library: library!,
            address: account!,
            workerCount: workerCount || 4,
            onWordsFound,
            updateHashRate: setHashRate,
            lookingFor: lookingForCoalesced,
            startingNonce: initialOffset,
          });
    
          setMiningController(controller);
          controller.start().catch((e: any) => {
            console.log("Error mining: " + e);
            stop();
          });
        }
    }

    start();

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
        {hashRate ? <div>Mining mwords{'.'.repeat(ellipses)}</div> : <div>Starting up the miner{'.'.repeat(ellipses)}</div>}
        {<div>Number of workers: {workerCount || 4}</div>}
        {hashRate && <div>Hash rate: ~{hashRate} h/s</div>}
        {bountyHunt && <div>Bounty hunt mode on</div>}
        {allLookingFor && <div>Looking for words: {allLookingFor?.join(', ')}</div>}
       {getFoundMessage(foundWords)}
        <Row><div style={{ marginRight: '8px' }}>Most recent word:</div>{foundWords.length ? 
            <WordAndNonce word={foundWords[foundWords.length - 1].word} nonce={foundWords[foundWords.length - 1].nonce} />: "-----"}
        </Row>
    </Column>
    )
}
