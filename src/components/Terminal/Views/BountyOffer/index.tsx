import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getHashFromWord } from '../../../../utils/word-util'

const MINEABLEWORDS_ADDR = process.env.MINEABLEWORDS_ADDR || '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const attemptBountyOffer = async function (
    lib: Web3Provider,
    nonce: ethers.BigNumber,
    offer: number,
  ): Promise<string> {
      console.log({ nonce, offer })
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
        const numMined = 100;
      const tx = await contract.connect(signer).mint(nonce.toHexString(), {
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000, value: ethers.BigNumber.from(offer),
      });
      return tx.hash;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

type BounterOfferProps = { word: string, offer: number }

export const BountyOffer = ({ word, offer }: BounterOfferProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [hasCompleted, setHasCompleted] = useState(false)
    const [error, setError] = useState();
    const [nonce, setNonce] = useState<ethers.BigNumber | null>(null);

    useEffect(() => {
        const encodeWord = async () => {
            if(library) {
                const encoded = await getHashFromWord(word)
                setNonce(encoded)
            }
        }
        encodeWord();
    }, [library, word])

    useEffect(() => {
        const bountyOffer = async () => {
            if(account && !hasCompleted && nonce) {
                try {
                    console.log('!!!', { nonce, offer })
                    await attemptBountyOffer(library!, nonce, offer)
                    setHasCompleted(true);
                } catch (e: any) {
                    setError(e.message)
                }
            }
        }
        bountyOffer();
    }, [account, nonce, hasCompleted])

  return (
    <div>
      Offering bounty of {offer} for mword {word}{nonce && ` -- ${nonce}`}...
      {hasCompleted && <div>Successfully offered bounty.</div>}
      {error && <div>Encountered error: {error}</div>}
    </div>
  );
};

