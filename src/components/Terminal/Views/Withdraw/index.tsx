import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'
import { TxStatus } from "../../../../utils/statuses";
import { MINEABLEWORDS_ADDR } from '../../../../web3-util/config'

export const attemptWithdraw = async function (
    lib: Web3Provider,
  ): Promise<string> {
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
        const numMined = 100;
      const tx = await contract.connect(signer).withdraw({
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000,
      });
      return tx.hash;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

type BounterOfferProps = { withdrawId: string }

export const Withdraw = ({ withdrawId }: BounterOfferProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[withdrawId] || TxStatus.FAILED;

    useEffect(() => {
        const withdraw = async () => {
            if(account && status === TxStatus.INITIATED.toString()) {
                try {
                    await attemptWithdraw(library!)
                    navigate(addQueryParamsToNavPath({ [withdrawId] : TxStatus.SUCCESS }, location.search));
                } catch (e: any) {
                    navigate(addQueryParamsToNavPath({ [withdrawId] : TxStatus.FAILED }, location.search));
                }
            }
        }
        withdraw();
    }, [account, library, status, withdrawId, location, navigate])

  return (
    <div>
      Withdrawing your funds...
      {status === TxStatus.SUCCESS.toString() && <div>Successfully withdrew funds.</div>}
      {status === TxStatus.FAILED.toString() && <div>Denied transaction or otherwise encountered error.</div>}
    </div>
  );
};

