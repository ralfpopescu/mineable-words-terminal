import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getHashFromWord } from '../../../../utils/word-util'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'
import { BountyClaimStatus } from "../../../../utils/statuses";

const MINEABLEWORDS_ADDR = process.env.REACT_APP_MINEABLE_WORDS_ADDRESS || '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'

export const isOwner = async function (
    lib: Web3Provider,
    nonce: ethers.BigNumber,
  ): Promise<boolean> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
      const owner = await contract.ownerOf(nonce);
      return owner === signer._address;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

export const attemptBountyClaim = async function (
    lib: Web3Provider,
    nonce: ethers.BigNumber,
  ): Promise<string> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
      const numMined = await (await contract.totalSupply()).toNumber();
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

type BounterOfferProps = { word: string, bountyClaimId: string }

export const BountyClaim = ({ word, bountyClaimId }: BounterOfferProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [nonce, setNonce] = useState<ethers.BigNumber | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[bountyClaimId] || BountyClaimStatus.FAILED;

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
            if(account && nonce && status === '0') {
                try {
                    const canClaim = await isOwner(library!, nonce);
                    if(!canClaim) navigate(addQueryParamsToNavPath({ [bountyClaimId] : BountyClaimStatus.NOT_OWNER }, location.search));
                    await attemptBountyClaim(library!, nonce)
                    navigate(addQueryParamsToNavPath({ [bountyClaimId] : BountyClaimStatus.SUCCESS }, location.search));
                } catch (e: any) {
                    navigate(addQueryParamsToNavPath({ [bountyClaimId] : BountyClaimStatus.FAILED }, location.search));
                }
            }
        }
        bountyOffer();
    }, [account, nonce, library, status, bountyClaimId, location, navigate])

  return (
    <div>
      Claiming bounty for mword {word}{nonce && ` -- ${nonce}`}...
      {status === BountyClaimStatus.NOT_OWNER.toString() && <div>Need to own the mword to claim bounty. Do you have the right account connected?</div>}
      {status === BountyClaimStatus.SUCCESS.toString() && <div>Successfully claimed bounty.</div>}
      {status === BountyClaimStatus.FAILED.toString() && <div>Denied transaction or otherwise encountered error.</div>}
    </div>
  );
};

