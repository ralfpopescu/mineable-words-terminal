type Networks = {
    LOCAL: string | undefined,
    ROPSTEN: string | undefined,
    MAINNET: string | undefined,
}

export const chainIds: { [key in keyof Networks]: number } = {
    MAINNET: 1,
    ROPSTEN: 3,
    LOCAL: 1340,
}

export const chainUrls:  { [key in keyof Networks]: string } = {
    MAINNET: process.env.REACT_APP_MAINNET_URL || "https://cloudflare-eth.com",
    ROPSTEN: process.env.REACT_APP_ROPSTEN_URL || "https://ropsten.infura.io/v3/d37e4dbaecf44046817af6c860a500bf",
    LOCAL: "http://localhost:8545",
}

export const contractAddresses: Networks = {
    LOCAL: process.env.REACT_APP_MINEABLE_WORDS_ADDRESS_LOCAL,
    ROPSTEN: process.env.REACT_APP_MINEABLE_WORDS_ADDRESS_ROPSTEN,
    MAINNET: process.env.REACT_APP_MINEABLE_WORDS_ADDRESS_MAIN,
}

export const MINEABLEWORDS_ADDR = contractAddresses[process.env.REACT_APP_NETWORK as keyof Networks || 'LOCAL' as 'LOCAL'] 
    || "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

console.log({ MINEABLEWORDS_ADDR })