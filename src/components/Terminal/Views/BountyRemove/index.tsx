import * as ethers from "ethers";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from "../../../../typechain";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { TxStatus } from "../../../../utils/statuses";
import { getHashFromWord } from "../../../../utils/word-util";
import { MINEABLEWORDS_ADDR } from "../../../../web3-util/config";

export const attemptBountyRemove = async function (
  lib: Web3Provider,
  encodedWord: ethers.BigNumber
): Promise<string> {
  const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
  try {
    const signer = lib.getSigner();
    const tx = await contract.connect(signer).removeBounty(encodedWord);
    return tx.hash;
  } catch (e: any) {
    const message: string = e.message;
    console.log(message);
    throw e;
  }
};

type BountyRemoveProps = { word: string; bountyRemoveId: string };

export const BountyRemove = ({ word, bountyRemoveId }: BountyRemoveProps) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const status = queryParams[bountyRemoveId] || TxStatus.FAILED;
  const encodedWord = getHashFromWord(word);

  useEffect(() => {
    const withdraw = async () => {
      if (account && status === TxStatus.INITIATED.toString()) {
        try {
          await attemptBountyRemove(library!, encodedWord);
          navigate(
            addQueryParamsToNavPath({ [bountyRemoveId]: TxStatus.SUCCESS }, location.search)
          );
        } catch (e: any) {
          navigate(addQueryParamsToNavPath({ [bountyRemoveId]: TxStatus.FAILED }, location.search));
        }
      }
    };
    withdraw();
  }, [account, library, status, bountyRemoveId, encodedWord, location, navigate]);

  return (
    <div>
      Completing bounty removal on {word}...
      {status === TxStatus.SUCCESS.toString() && <div>Successfully retrieved bounty funds.</div>}
      {status === TxStatus.FAILED.toString() && (
        <div>Denied transaction or otherwise encountered error.</div>
      )}
    </div>
  );
};
