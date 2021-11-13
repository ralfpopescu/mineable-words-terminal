import { 
    Bounties,
    BountyClaim,
    BountyOffer,
    BountyRemove,
    BountyRemoveInitiate,
    Calculations,
    Connect,
    FAQ,
    FoundWords,
    Help,
    Info,
    Links,
    Mine,
    Mint,
    RecentlyMined, 
    Withdraw,
} from './Views'
import { BigNumber } from "@ethersproject/bignumber";
import { randomBytes } from "@ethersproject/random";
import { generateNonce, getInvalidCharactersFromWord } from '../../utils/word-util'
import { assertValidOptions, getOptions, getQueryParamsFromSearch, getNavigationPathFromParams, concatQueryParams, splitOnSpaces, getWordsFromOptions } from '../../utils'
import { Location, NavigateFunction } from 'react-router-dom';
import { wrapInErrorWrapper } from './command-wrapper';

type CommandsInput = {
    account: string | null | undefined;
    location: Location;
    navigate: NavigateFunction;
}

export const commands = ({ account, location, navigate }: CommandsInput) => wrapInErrorWrapper({
    help: () => <Help />,
    faq: () => <FAQ />,
    recent: () => {
        if(!account) return <div>Need to connect account to see recently mined mwords. Use command "connect".</div>
        return <RecentlyMined />
    },
    links: () => <Links />,
    info: () => <Info />,
    calc: (input: string) => {
        const options = getOptions<{ h?: string, l?: string }>(input);
        const invalidOptions = assertValidOptions(options, ["h", "l"]);
        if(invalidOptions) return invalidOptions;

        const hashRate = parseInt(options.h || '');
        const lengthOfWord = parseInt(options.l || '');

        if((options.h && !hashRate) || (options.l && !lengthOfWord)) return `Must enter valid, positive, non-zero integers.`

        return <Calculations hashRate={hashRate} lengthOfWord={lengthOfWord} />
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
        navigate(navPath)
        return "Stopping mining."
    },
    mine: (input: string) => {
        console.log({ input })
        if(!account) return <div>Need to connect account to mine mwords. Use command "connect".</div>

        const options = getOptions<{ s?: string, n?: string, w?: string }>(input);
        const invalidOptions = assertValidOptions(options, ["s", "n", "w"]);
        if(invalidOptions) return invalidOptions;

        const randomNonce = options.s === 'r' ? BigNumber.from(randomBytes(32)) : undefined;
        const specifiedNonce = options.s ? BigNumber.from(options.s) : undefined;
        let workerCount = options.n ? parseInt(options.n) : 4;

        if(options.s && !specifiedNonce && options.s !== 'r') return "Must specify a valid, positive number or 'r' (for random) if passing a starting nonce."

        const wordOptions = options.w;
        let words;

        if(wordOptions) {
            const processedWordOptions = getWordsFromOptions(wordOptions);
            if(!processedWordOptions) return "Words must be passed in the following format: -w [hello,goodbye]"
            const invalidCharacters = processedWordOptions.map(word => getInvalidCharactersFromWord(word)).flat();
            console.log({ invalidCharacters })
            if(invalidCharacters.length) return `Invalid characters: ${invalidCharacters.join(' ')}`
            words = processedWordOptions;
        }

        const startingNonce = randomNonce || specifiedNonce ||  BigNumber.from(0);

        const minerId = `miner-${generateNonce(12)}`;

        navigate(concatQueryParams(location.search, `${minerId}=0`));

        console.log({ lookingFor: words })

        return <Mine 
        workerCount={workerCount}
        initialOffset={startingNonce} 
        lookingFor={words} 
        minerId={minerId}
        />
    },
    mint: (input: string) => {
        if(!account) return <div>Need to connect account to mint. Use command "connect".</div>

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
    bounties: () => {
        if(!account) return <div>Need to connect account to view bounties. Use command "connect".</div>
        return <Bounties />
    },
    "bounty-claim": (input: string) => {
        if(!account) return <div>Need to connect account to claim a bounty. Use command "connect".</div>

        const options = splitOnSpaces(input);

        if(options.length !== 1) return "Must enter an mword that has a bounty and that you own."

        const word = options[0];

        const bountyClaimId = `bountyClaimId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${bountyClaimId}=0`)
        navigate(concat);

        return <BountyClaim word={word} bountyClaimId={bountyClaimId} />
    },
    "bounty-offer": (input: string) => {
        if(!account) return <div>Need to connect account to offer a bounty. Use command "connect".</div>

        const options = splitOnSpaces(input);

        if(options.length !== 2) return "Must enter a desired word and an offer in eth."

        const word = options[0];
        const offer = options[1];

        const parsedOffer = parseFloat(offer);
        if(!parsedOffer) return "Must offer a valid, positive amount of eth."

        const bountyOfferId = `bountyOfferId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${bountyOfferId}=0`)
        navigate(concat);

        return <BountyOffer word={word} offer={parsedOffer} bountyOfferId={bountyOfferId} />
    },
    "bounty-remove-initiate": (input: string) => {
        if(!account) return <div>Need to connect account to initiate bounty removal. Use command "connect".</div>

        const options = splitOnSpaces(input);

        if(options.length !== 1) return "Must enter a word on which you have a bounty."

        const word = options[0];

        const bountyRemoveInitiateId = `bountyRemoveInitiateId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${bountyRemoveInitiateId}=0`)
        navigate(concat);

        return <BountyRemoveInitiate word={word} bountyRemoveInitiateId={bountyRemoveInitiateId} />
    },
    "bounty-remove-complete": (input: string) => {
        if(!account) return <div>Need to connect account to complete bounty removal. Use command "connect".</div>

        const options = splitOnSpaces(input);

        if(options.length !== 1) return "Must enter a word on which you initiated a bounty removal."

        const word = options[0];

        const bountyRemoveId = `bountyRemoveId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${bountyRemoveId}=0`)
        navigate(concat);

        return <BountyRemove word={word} bountyRemoveId={bountyRemoveId} />
    },
    withdraw: async () => {
        if(!account) return <div>Need to connect account to withdraw funds. Use command "connect".</div>

        const withdrawId = `withdrawId-${generateNonce(12)}`;
        const concat = concatQueryParams(location.search, `${withdrawId}=0`)
        navigate(concat);

        return <Withdraw withdrawId={withdrawId} />
    },
  });


  export const getCommands = ({ account, location, navigate }: CommandsInput) => {
    return commands({ account, location, navigate })
  }