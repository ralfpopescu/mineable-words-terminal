import * as ethers from "ethers";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getWordFromNonceAndAddress } from '../../../../utils/word-util'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'
import { TxStatus } from "../../../../utils/statuses";

const MINEABLEWORDS_ADDR = process.env.REACT_APP_MINEABLE_WORDS_ADDRESS || '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'

console.log('mint', { MINEABLEWORDS_ADDR })

export const attemptMint = async function (
    lib: Web3Provider,
    nonce: ethers.BigNumber,
  ): Promise<string> {
      console.log('attempting mint', nonce)
    const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
    try {
      const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
        const numMined = 100;
      const tx = await contract.connect(signer).mint(nonce.toHexString(), {
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000, value: 9000000000000000
      });
      return tx.hash;
    } catch (e: any) {
      const message: string = e.message;
        console.log(message)
      throw e;
    }
  };

type MintProps = { nonce: ethers.BigNumber, mintId: string }

export const Mint = ({ nonce, mintId }: MintProps) => {
    const { library, account } = useWeb3React<Web3Provider>();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[mintId] || TxStatus.FAILED.toString();

    useEffect(() => {
        const mint = async () => {
            if(account && status === TxStatus.INITIATED.toString()) {
                try {
                    await attemptMint(library!, nonce)
                    navigate(addQueryParamsToNavPath({ [mintId] : TxStatus.SUCCESS }, location.search));
                } catch (e: any) {
                    navigate(addQueryParamsToNavPath({ [mintId] : TxStatus.FAILED }, location.search));
                }
            }
        }
        mint();
    }, [account, status, library, location, mintId, navigate, nonce])

    if(!account) return <div>Need to connect account to mint.</div>

  return (
    <div>
        {console.log({ account })}
      Minting mword {getWordFromNonceAndAddress({ nonce, address: ethers.BigNumber.from(account)})} -- {nonce._hex} 
      {status === TxStatus.SUCCESS.toString() && <div>Successfully minted.</div>}
      {status === TxStatus.FAILED.toString() && <div>Denied transaction or otherwise encountered error.</div>}
    </div>
  );
};

