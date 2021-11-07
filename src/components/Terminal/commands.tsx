import { 
    BountyClaim,
    BountyOffer,
    Calculations,
    Connect,
    FAQ,
    FoundWords,
    Help,
    Info,
    Links,
    Mine,
    Mint,
    RecentlyMined, } from './Views'
import { BigNumber } from "@ethersproject/bignumber";
import { randomBytes } from "@ethersproject/random";
import { getWordFromNonceAndAddress, generateNonce } from '../../utils/word-util'
import { assertValidOptions, getOptions, getQueryParamsFromSearch, getNavigationPathFromParams, concatQueryParams } from '../../utils'
import { Location, NavigateFunction } from 'react-router-dom';

const splitOnSpaces = (input: string) => input.split(/\s+/);

type CommandsInput = {
    account: string | null | undefined;
    location: Location;
    navigate: NavigateFunction;
}

const calculateTimeInHours = (hashRate: number, lengthOfWord: number) =>  {
    const result = ((27 ** lengthOfWord) / (hashRate * 1000000)) / 60 / 60;
    console.log({ result, hashRate, lengthOfWord })
    return result;
}

const getWordsFromOptions = (input: string): string[] | null => {
    try {
        //enter [hello,goodbye, hi]
        const splitOnBrackets= input.split('[')[1].split(']')[0];
        const splitOnCommas = splitOnBrackets.split(',');
        return splitOnCommas.map(w => w.replace(/\s/g,''))
    } catch (e) {
        return null
    }
}

export const commands = ({ account, location, navigate }: CommandsInput) => ({
    help: () => <Help />,
    faq: () => <FAQ />,
    recent: () => <RecentlyMined />,
    links: () => <Links />,
    info: () => <Info />,
    calc: (input: string) => {
        const options = getOptions<{ h?: string, l?: string }>(input);
        const invalidOptions = assertValidOptions(options, ["h", "l"]);
        if(invalidOptions) return invalidOptions;

        const hashRate = parseInt(options.h || '');
        const lengthOfWord = parseInt(options.l || '');

        if((options.h && !hashRate) || (options.l && !lengthOfWord)) return `Must enter valid, positive, non-zero integers.`

        if(hashRate) {
            if(lengthOfWord) {
                return `It would take you ${calculateTimeInHours(hashRate, lengthOfWord)} hours to mine a word of length ${lengthOfWord} at a hash rate of ${hashRate} MH/s.`
            }
            const wordLengths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            const times = wordLengths.map(l => ({ wordLength: l, time: calculateTimeInHours(hashRate, l) }))
            const calculations = [{ hashRate, times }]
            return <Calculations calculations={calculations} />
        } else {
            if(lengthOfWord) {
                const hashRates = [1, 10, 100, 500, 10000] 
                const calculations = hashRates
                .map(hr => 
                    ({ hashRate: hr, times: [
                        { wordLength: lengthOfWord, time: calculateTimeInHours(hr, lengthOfWord) }
                    ]}))
                return <Calculations calculations={calculations} />
            }
            const wordLengths = [4, 6, 8, 10, 12, 13, 14, 15];
            const hashRates = [10, 100, 500, 10000] 
            const calculations = hashRates.map(hr => {
                return {
                    hashRate: hr,
                    times: wordLengths.map(wordLength => ({ wordLength, time: calculateTimeInHours(hr, wordLength) }))
                }
            })
            return <Calculations calculations={calculations} />
        }
    },
    connect: async () => <Connect />,
    stop: () => {
        const params = getQueryParamsFromSearch(location.search);
        const keys = Object.keys(params);
        const newParams = keys.map((key: string) => {
            const split = key.split('-');
            const paramType = split[0];
            const paramId = split[1];
            if(paramType === 'miner') {
                return { [`miner-${paramId}`]: '3'}
            }
            return { [key]: params[key] }
        }).reduce((acc, curr) => ({ ...acc, ...curr }))
        const navPath = getNavigationPathFromParams(newParams);
        console.log('stopping!!')
        navigate(navPath)
        return "Stopping mining."
    },
    mine: (input: string) => {
        if(!account) return <div>Need to connect account to mine.</div>

        const options = getOptions<{ r?: string, n?: string, w?: string }>(input);
        const invalidOptions = assertValidOptions(options, ["r", "n", "w"]);
        if(invalidOptions) return invalidOptions;

        const randomNonce = options.r ? BigNumber.from(randomBytes(32)) : undefined;
        const specifiedNonce = options.n? BigNumber.from(options.n) : undefined;

        if(options.n && !specifiedNonce) return "Must specify a valid, positive number if passing a starting nonce."

        const wordOptions = options.w;
        let words;

        if(wordOptions) {
            const processedWordOptions = getWordsFromOptions(wordOptions);
            if(!processedWordOptions) return "Words must be passed in the following format: -w [hello,goodbye]"
            words = processedWordOptions;
        }

        if(randomNonce && specifiedNonce) return "Cannot both specify a specific starting nonce and randomize nonce."

        console.log({ randomNonce, specifiedNonce })
        const startingNonce = randomNonce || specifiedNonce;

        const minerId = `miner-${generateNonce(12)}`;

        navigate(concatQueryParams(location.search, `${minerId}=0`));

        return <Mine 
        initialOffset={startingNonce || BigNumber.from(0)} 
        lookingFor={words} 
        minerId={minerId}
        />
    },
    mint: (input: string) => {
        if(!account) return <div>Need to connect account to mint.</div>

        const options = splitOnSpaces(input);

        if(options.length !== 1) return "Must enter a single nonce or word."

        const entry: string = options[0]
        let nonce;

        try {
            nonce = BigNumber.from(entry);
        } catch (e) {
            const foundStorage = localStorage.getItem('found');
            if(foundStorage) {
                try {
                    const parsed = JSON.parse(foundStorage);
                    nonce = BigNumber.from(parsed[entry]);
                } catch (e) {
                    console.log('Failed to parse local storage', e)
                }
            }
        } finally {
            if(!nonce) return 'You have entered neither a valid nonce, nor a word you have found.'
        }

        const mintId = `mintId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${mintId}=0`)
        navigate(concat);

        return <Mint nonce={nonce} mintId={mintId} />
    },
    found: () => <FoundWords />,
    "bounty-claim": (input: string) => {
        if(!account) return <div>Need to connect account to mint.</div>

        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter an mword that has a bounty and that you own."

        const word = options[0];

        const bountyClaimId = `bountyClaimId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${bountyClaimId}=0`)
        navigate(concat);

        return <BountyClaim word={word} bountyClaimId={bountyClaimId} />
    },
    "bounty-offer": (input: string) => {
        if(!account) return <div>Need to connect account to offer a bounty.</div>

        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter a desired word and an offer in eth."

        const word = options[0];
        const offer = options[1];

        const parsedOffer = parseFloat(offer);
        if(!parsedOffer) return "Must offer a valid, positive amount of eth."

        const bountyOfferId = `bountyOfferId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${bountyOfferId}=0`)
        console.log('bountyofferconat', concat)
        navigate(concat);

        return <BountyOffer word={word} offer={parsedOffer} bountyOfferId={bountyOfferId} />
    },
  });


  export const getCommands = ({ account, location, navigate }: CommandsInput) => {
    //   console.log('getting commands', getMiningStatus, getMiningStatus())
    return commands({ account, location, navigate })
  }