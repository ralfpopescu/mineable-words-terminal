import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getHashFromWord } from '../../../../utils/word-util'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'
import { TxStatus } from "../../../../utils/statuses";

const MINEABLEWORDS_ADDR = process.env.REACT_APP_MINEABLE_WORDS_ADDRESS || '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'

export const attemptBountyOffer = async function (
    lib: Web3Provider,
    nonce: ethers.BigNumber,
    offer: number,
  ): Promise<string> {
      console.log({ nonce, offer })
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
        const oneEther = ethers.BigNumber.from("1000000000000000000");
      const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
        const numMined = 100;
      const tx = await contract.connect(signer).offerBounty(nonce.toHexString(), {
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000, value: oneEther.mul(offer),
      });
      return tx.hash;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

type BounterOfferProps = { word: string, offer: number, bountyOfferId: string }

export const BountyOffer = ({ word, offer, bountyOfferId }: BounterOfferProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [nonce, setNonce] = useState<ethers.BigNumber | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[bountyOfferId] || TxStatus.FAILED;

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
            if(account && nonce && status === TxStatus.INITIATED.toString()) {
                try {
                    await attemptBountyOffer(library!, nonce, offer)
                    navigate(addQueryParamsToNavPath({ [bountyOfferId] : TxStatus.SUCCESS }, location.search));
                } catch (e: any) {
                    navigate(addQueryParamsToNavPath({ [bountyOfferId] : TxStatus.FAILED }, location.search));
                }
            }
        }
        bountyOffer();
    }, [account, nonce, library, offer, status, bountyOfferId, location, navigate])

  return (
    <div>
      Offering bounty of {offer} for mword {word}{nonce && ` -- ${nonce}`}...
      {status === TxStatus.SUCCESS.toString() && <div>Successfully offered bounty.</div>}
      {status === TxStatus.FAILED.toString() && <div>Denied transaction or otherwise encountered error.</div>}
    </div>
  );
};

