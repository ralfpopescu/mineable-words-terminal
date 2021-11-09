import * as ethers from "ethers";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getHashFromWord } from '../../../../utils/word-util'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'
import { BountyClaimStatus } from "../../../../utils/statuses";
import { MINEABLEWORDS_ADDR } from '../../../../web3-util/config'

export const isOwner = async function (
    lib: Web3Provider,
    encodedWord: ethers.BigNumber,
    account: string,
  ): Promise<boolean> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const owner = await contract.ownerOf(encodedWord);
      return owner === account;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

export const attemptBountyClaim = async function (
    lib: Web3Provider,
    encodedWord: ethers.BigNumber,
  ): Promise<string> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
      const numMined = await (await contract.totalSupply()).toNumber();
      const tx = await contract.connect(signer).claimBounty(encodedWord, {
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
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[bountyClaimId] || BountyClaimStatus.FAILED;
    const encodedWord = getHashFromWord(word);

    useEffect(() => {
        const bountyOffer = async () => {
            if(account && status === BountyClaimStatus.INITIATED.toString()) {
                try {
                    const canClaim = await isOwner(library!, encodedWord, account);
                    if(!canClaim) navigate(addQueryParamsToNavPath({ [bountyClaimId] : BountyClaimStatus.NOT_OWNER }, location.search));
                    await attemptBountyClaim(library!, encodedWord)
                    navigate(addQueryParamsToNavPath({ [bountyClaimId] : BountyClaimStatus.SUCCESS }, location.search));
                } catch (e: any) {
                    navigate(addQueryParamsToNavPath({ [bountyClaimId] : BountyClaimStatus.FAILED }, location.search));
                }
            }
        }
        bountyOffer();
    }, [account, library, status, bountyClaimId, location, navigate, encodedWord])

  return (
    <div>
      Claiming bounty for mword {word}{encodedWord && ` -- ${encodedWord._hex}`}...
      {status === BountyClaimStatus.NOT_OWNER.toString() && <div>Need to own the mword to claim bounty. Do you have the right account connected?</div>}
      {status === BountyClaimStatus.SUCCESS.toString() && <div>Successfully claimed bounty.</div>}
      {status === BountyClaimStatus.FAILED.toString() && <div>Denied transaction or otherwise encountered error.</div>}
    </div>
  );
};

