import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getWordFromHash } from '../../../../utils/word-util'

const MINEABLEWORDS_ADDR = process.env.MINEABLEWORDS_ADDR || '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const attemptMint = async function (
    lib: Web3Provider,
    nonce: ethers.BigNumber,
  ): Promise<string> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
        const numMined = 100;
      const tx = await contract.connect(signer).mint(nonce.toHexString(), {
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000,
      });
      return tx.hash;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

type MintProps = { nonce: ethers.BigNumber }

export const Mint = ({ nonce }: MintProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [hasCompleted, setHasCompleted] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const mint = async () => {
            if(account && !hasCompleted && !error) {
                try {
                    await attemptMint(library!, nonce)
                    setHasCompleted(true);
                } catch (e: any) {
                    setError(e.message)
                }
            }
        }
        mint();
    })

    if(!account) return <div>Need to connect account to mint.</div>

  return (
    <div>
      Minting mword {getWordFromHash(nonce, ethers.BigNumber.from(account))} -- {nonce._hex} 
      {hasCompleted && <div>Successfully minted.</div>}
      {error && <div>Encountered error: {error}</div>}
    </div>
  );
};

