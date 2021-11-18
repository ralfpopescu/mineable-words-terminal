import * as ethers from "ethers";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from "../../../../typechain";
import { getWordFromNonceAndAddress } from "../../../../utils/word-util";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { TxStatus } from "../../../../utils/statuses";
import { MINEABLEWORDS_ADDR } from "../../../../web3-util/config";
import { isMPunkOwner } from "../../../../web3-util/methods";

export const attemptMint = async function (
  lib: Web3Provider,
  account: string,
  nonce: ethers.BigNumber
): Promise<string> {
  const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
  console.log(contract);
  console.log(contract.filters);
  const filters = await contract.queryFilter(
    contract.filters.Transfer("0x0000000000000000000000000000000000000000")
  );
  console.log({ filters });
  try {
    const signer = lib.getSigner();
    //   const numMined = await contract.numMined();
    const numMined = 100;
    const ownsMpunk = await isMPunkOwner({
      library: lib,
      ownerAddress: ethers.BigNumber.from(account),
    });

    const value = ownsMpunk ? 0 : 9000000000000000;

    const tx = await contract.connect(signer).mint(nonce.toHexString(), {
      gasLimit: (numMined + 1) % 33 === 0 ? 1400000 : 700000,
      value,
    });
    return tx.hash;
  } catch (e: any) {
    const message: string = e.message;
    console.log(message);
    throw e;
  }
};

type MintProps = { nonce: ethers.BigNumber; mintId: string };

export const Mint = ({ nonce, mintId }: MintProps) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const status = queryParams[mintId] || TxStatus.FAILED.toString();

  useEffect(() => {
    const mint = async () => {
      if (account && status === TxStatus.INITIATED.toString()) {
        try {
          await attemptMint(library!, account, nonce);
          navigate(addQueryParamsToNavPath({ [mintId]: TxStatus.SUCCESS }, location.search));
        } catch (e: any) {
          navigate(addQueryParamsToNavPath({ [mintId]: TxStatus.FAILED }, location.search));
        }
      }
    };
    mint();
  }, [account, status, library, location, mintId, navigate, nonce]);

  if (!account) return <div>Need to connect account to mint.</div>;

  return (
    <div>
      Minting mword {getWordFromNonceAndAddress({ nonce, address: ethers.BigNumber.from(account) })}{" "}
      -- {nonce._hex}
      {status === TxStatus.SUCCESS.toString() && <div>Successfully minted.</div>}
      {status === TxStatus.FAILED.toString() && (
        <div>Denied transaction or otherwise encountered error.</div>
      )}
    </div>
  );
};
