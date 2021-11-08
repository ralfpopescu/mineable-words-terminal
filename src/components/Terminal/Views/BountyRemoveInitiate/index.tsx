import * as ethers from "ethers";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'
import { TxStatus } from "../../../../utils/statuses";
import { getHashFromWord } from '../../../../utils/word-util'

const MINEABLEWORDS_ADDR = process.env.REACT_APP_MINEABLE_WORDS_ADDRESS || '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'

export const attemptBountyRemoveInitiate = async function (
    lib: Web3Provider,
    encodedWord: ethers.BigNumber,
  ): Promise<string> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
        const numMined = 100;
      const tx = await contract.connect(signer).initiateBountyRemoval(encodedWord, {
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000,
      });
      return tx.hash;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

type BountyRemoveInitiateProps = { word: string, bountyRemoveInitiateId: string }

export const BountyRemoveInitiate = ({ word, bountyRemoveInitiateId }: BountyRemoveInitiateProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[bountyRemoveInitiateId] || TxStatus.FAILED;
    const encodedWord = getHashFromWord(word);

    useEffect(() => {
        const withdraw = async () => {
            if(account && status === TxStatus.INITIATED.toString()) {
                try {
                    await attemptBountyRemoveInitiate(library!, encodedWord)
                    navigate(addQueryParamsToNavPath({ [bountyRemoveInitiateId] : TxStatus.SUCCESS }, location.search));
                } catch (e: any) {
                    navigate(addQueryParamsToNavPath({ [bountyRemoveInitiateId] : TxStatus.FAILED }, location.search));
                }
            }
        }
        withdraw();
    }, [account, library, status, bountyRemoveInitiateId, encodedWord, location, navigate])

  return (
    <div>
      Initiating bounty remove on {word}...
      {status === TxStatus.SUCCESS.toString() && <div>Successfully initiated bounty removal. Run "bounty-remove {word}" after 100 blocks has passed to finish retrieving your funds. Your bounty can still be claimed in this time.</div>}
      {status === TxStatus.FAILED.toString() && <div>Denied transaction or otherwise encountered error.</div>}
    </div>
  );
};

