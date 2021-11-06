import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from '../../../../typechain'
import { getWordFromNonceAndAddress } from '../../../../utils/word-util'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from '../../../../utils'

const MINEABLEWORDS_ADDR = process.env.MINEABLEWORDS_ADDR || '0x5FbDB2315678afecb367f032d93F642f64180aa3'

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
        gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000,
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
    const [error, setError] = useState()
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = getQueryParamsFromSearch(location.search)
    const status = queryParams[mintId] || '2';
    console.log({ nonce, mintId, status, queryParams })

    useEffect(() => {
        const mint = async () => {
            if(account && status === '0') {
                try {
                    console.log('aaa', addQueryParamsToNavPath({ [mintId] : '1'}, location.search))
                    await attemptMint(library!, nonce)
                    navigate(addQueryParamsToNavPath({ [mintId] : '1'}, location.search));
                } catch (e: any) {
                    setError(e.message)
                    console.log('setting', { mindId: 'error' })
                    console.log('bbb', addQueryParamsToNavPath({ [mintId] : '1'}, location.search))
                    navigate(addQueryParamsToNavPath({ [mintId] : '2'}, location.search));
                }
            }
        }
        mint();
    }, [account, status])

    if(!account) return <div>Need to connect account to mint.</div>

  return (
    <div>
      Minting mword {getWordFromNonceAndAddress(nonce, ethers.BigNumber.from(account))} -- {nonce._hex} 
      {status === '1' && <div>Successfully minted.</div>}
      {status === '2' && <div>Encountered error. {error}</div>}
    </div>
  );
};

