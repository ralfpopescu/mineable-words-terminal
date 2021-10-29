import { FAQ } from './Views/FAQ'
import { RecentlyMined } from './Views/RecentlyMined'
import { Mine } from './Views/Mine'
import { Help } from './Views/Help'
import { Links } from './Views/Links'
import { Calculations } from './Views/Calculations'
import { BigNumber } from "@ethersproject/bignumber";
import { randomBytes } from "@ethersproject/random";
import { getWordFromHash } from '../../miner/mine'
import { assertValidOptions, getOptions } from '../../utils'

const splitOnSpaces = (input: string) => input.split(/\s+/);

const address = BigNumber.from(123);

type CommandsInput = {
    stagedNonce: BigNumber | null,
    setStagedNonce: (nonce: BigNumber | null) => void,
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

export const commands = ({ stagedNonce, setStagedNonce }: CommandsInput) => ({
    help: () => <Help />,
    faq: () => <FAQ />,
    recent: () => <RecentlyMined />,
    links: () => <Links />,
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
    wallet: "Linking your wallet...",
    mine: (input: string) => {
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

        return <Mine initialOffset={startingNonce || BigNumber.from(0)} address={address} lookingFor={words} />
    },
    mint: (input: string) => {
        const options = splitOnSpaces(input);

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
    "safe-mint": "Safe minting...",
    "bounty-claim": (input: string) => {
        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter a word that has a bounty and a nonce to submit."

        const word = options[0];
        const nonceOption = options[1];

        const nonce = BigNumber.from(nonceOption)
        if(!nonce) return "Must enter a valid nonce."

        const decodedWord = getWordFromHash(nonce, address)

        if(decodedWord !== word) return "This nonce does not generate the word you are trying to claim."

        return `This process takes two transactions to ensure no one can snipe your bounty. Proceed? y/n`
    },
    "bounty-offer": (input: string) => {
        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter a desired word and an offer in eth."

        const word = options[0];
        const offer = options[1];

        const parsedOffer = parseFloat(offer);
        if(!parsedOffer) return "Must offer a valid, positive amount of eth."

        return `Do you want to offer ${offer} eth for the word ${word}? y/n`
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
  });