import { MineableWords__factory } from '../typechain'
import * as ethers from "ethers";
import { MINEABLEWORDS_ADDR } from '../web3-util/config'

export const generateNonce = (length: number) => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1 ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    const nonce = result.join('');
   return nonce;
}

type Library = ethers.ethers.providers.Web3Provider

interface LibraryInput { library: Library }

interface DecodeMWordInput extends LibraryInput { mword: ethers.BigNumber }

interface EncodeMWordInput extends LibraryInput { word: string }

export const decodeMWord = async ({ library, mword }: DecodeMWordInput): Promise<string> => {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, library);
    const decoded = await contract.decodeMword(mword)
    return decoded;
}

export const encodeMWord = async ({ library, word }: EncodeMWordInput): Promise<ethers.BigNumber> => {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, library);
    const encoded = await contract.encodeMword(ethers.BigNumber.from(word))
    return encoded;
}

export const getAllMWords = async ({ library }: LibraryInput) => {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, library);
    
    const totalSupply = await contract.totalSupply();
    const mwords = [];
    for(let i = 0; i < totalSupply.toNumber(); i += 1) {
        const mword = await contract.tokenByIndex(i);
        mwords.push(mword);
    }
    return mwords;
}

export const getAllDecodedMWords = async ({ library }: LibraryInput): Promise<string[]> => {
    const allMWords = await getAllMWords({ library });
    return Promise.all(allMWords.map(mword => decodeMWord({ library, mword })))
} 

export const getAllBountiesOffered = async ({ library }: LibraryInput): Promise<ethers.BigNumber[]> => {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, library);
    console.log(contract.filters)
    const bountiesOffered = await contract.queryFilter(
      contract.filters.BountyOffered(null),
    );
    return bountiesOffered.map(b => b.args.mword);
} 

export const getAllBountiesRemoved = async ({ library }: LibraryInput): Promise<ethers.BigNumber[]> => {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, library);
    const bountiesRemoved = await contract.queryFilter(
      contract.filters.BountyRemoval(null),
    );
    return bountiesRemoved.map(b => b.args.mword);
} 

export const getCurrentBounties = async ({ library }: LibraryInput): Promise<ethers.BigNumber[]> => {
    const offered = await getAllBountiesOffered({ library });
    const removed = await getAllBountiesRemoved({ library });

    console.log({ offered, removed })

    return offered.filter(o => !removed.some(r => r._hex === o._hex))
}  



