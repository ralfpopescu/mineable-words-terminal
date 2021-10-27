import { FAQ } from './Views/FAQ'
import { RecentlyMined } from './Views/RecentlyMined'
import { FoundWords } from './Views/FoundWords'
import { Links } from './Views/Links'
import { BigNumber } from "@ethersproject/bignumber";
import { getWordFromHash } from '../../miner/mine'

const options = () => 
<div style={{ display: 'flex', flexDirection: 'column'}}>
<span>1. Mine mwords</span>
<span>2. Read FAQ</span>
<span>3. See recently mined words</span>
<span>4. Calculate expected time to mine</span>
<span>5. Mint a discovered mword</span>
<span>6. Get links to Discord/Twitter/OpenSea/Github</span>
</div>

const splitOnSpaces = (input: string) => input.split(/\s+/);

const address = BigNumber.from(123);

type CommandsInput = {
    stagedNonce: BigNumber | null,
    setStagedNonce: (nonce: BigNumber | null) => void,
}

export const commands = ({ stagedNonce, setStagedNonce }: CommandsInput) => ({
    options,
    "1": () => `To start mining mwords, use command "mine X", where X is the number you want to start.`,
    "2": () => <FAQ />,
    "3": () => <RecentlyMined />,
    "4": `Use command "calculate-mining-time X Y", where X is your hash-rate in MH/s and Y is the length of the word you are looking for.`,
    "5": 'To mint a word you found, use command "mint X", where X is the nonce for that word (ex. "0x2ea93")',
    "6": () => <Links />,
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