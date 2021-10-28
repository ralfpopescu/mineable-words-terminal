import { FAQ } from './Views/FAQ'
import { RecentlyMined } from './Views/RecentlyMined'
import { FoundWords } from './Views/FoundWords'
import { Help } from './Views/Help'
import { Links } from './Views/Links'
import { BigNumber } from "@ethersproject/bignumber";
import { getWordFromHash } from '../../miner/mine'


const splitOnSpaces = (input: string) => input.split(/\s+/);

const address = BigNumber.from(123);

type CommandsInput = {
    stagedNonce: BigNumber | null,
    setStagedNonce: (nonce: BigNumber | null) => void,
}

export const commands = ({ stagedNonce, setStagedNonce }: CommandsInput) => ({
    help: () => <Help />,
    faq: () => <FAQ />,
    recent: () => <RecentlyMined />,
    links: () => <Links />,
    calc: (input: string) => {
        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter exactly 2 integers."

        const hashRate = parseInt(options[0])
        const lengthOfWord = parseInt(options[1])

        if(!hashRate || !lengthOfWord || hashRate < 0 || lengthOfWord < 0) return "Must enter valid, positive, non-zero integers."
        const numberOfSeconds = (27 ^ lengthOfWord)/ hashRate * 1000000
        return `It would take you ${numberOfSeconds / 60 / 60} hours to mine a word of length ${lengthOfWord}.`
    },
    wallet: "Linking your wallet...",
    mine: (input: string) => {
        const options = splitOnSpaces(input);
        const offset = parseInt(options[0])

        return <FoundWords initialOffset={offset || 0} address={address} />
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
    "safe-mint": "Safe minting...",
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