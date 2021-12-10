import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MineableWords__factory } from "../../../../typechain";
import { getHashFromWord } from "../../../../utils/word-util";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { TxStatus } from "../../../../utils/statuses";
import { MINEABLEWORDS_ADDR } from "../../../../web3-util/config";
import { Highlight } from "../../../Highlight";

const scaleOffer = (offer: number, decimalPlaces: number) =>
  Math.floor(offer * 10 ** decimalPlaces);
const scaleEth = (eth: ethers.BigNumber, decimalPlaces: number) =>
  eth.div(ethers.BigNumber.from(10 ** decimalPlaces));

export const attemptBountyOffer = async function (
  lib: Web3Provider,
  nonce: ethers.BigNumber,
  offer: number
): Promise<string> {
  const contract = MineableWords__factory.connect(MINEABLEWORDS_ADDR, lib);
  try {
    const oneEther = ethers.BigNumber.from("1000000000000000000");
    const signer = lib.getSigner();
    //trims to 5 decimal places scales the values accordingly so we're not dealing with decimals
    const decimalPlaces = 5;
    const scaledOffer = scaleOffer(offer, decimalPlaces);
    const scaledEth = scaleEth(oneEther, decimalPlaces);

    const tx = await contract.connect(signer).offerBounty(nonce.toHexString(), {
      value: scaledEth.mul(scaledOffer),
    });
    return tx.hash;
  } catch (e: any) {
    const message: string = e.message;
    console.log(message);
    throw e;
  }
};

type BounterOfferProps = { word: string; offer: number; bountyOfferId: string };

export const BountyOffer = ({ word, offer, bountyOfferId }: BounterOfferProps) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const [nonce, setNonce] = useState<ethers.BigNumber | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const status = queryParams[bountyOfferId] || TxStatus.FAILED;

  useEffect(() => {
    const encodeWord = async () => {
      if (library) {
        const encoded = await getHashFromWord(word);
        setNonce(encoded);
      }
    };
    encodeWord();
  }, [library, word]);

  useEffect(() => {
    const bountyOffer = async () => {
      if (account && nonce && status === TxStatus.INITIATED.toString()) {
        try {
          await attemptBountyOffer(library!, nonce, offer);
          navigate(addQueryParamsToNavPath({ [bountyOfferId]: TxStatus.SUCCESS }, location.search));
        } catch (e: any) {
          navigate(addQueryParamsToNavPath({ [bountyOfferId]: TxStatus.FAILED }, location.search));
        }
      }
    };
    bountyOffer();
  }, [account, nonce, library, offer, status, bountyOfferId, location, navigate]);

  return (
    <div>
      Offering bounty of {offer} for mword <Highlight>{word}</Highlight>
      {nonce && ` -- ${nonce._hex}`}...
      <div>
        Caution: if you want to retrieve your bounty funds, there will be a 100 blocks delay where
        your bounty can still be claimed.
      </div>
      {status === TxStatus.SUCCESS.toString() && (
        <div>Successfully initiated bounty offer. Check tx status in your Ethereum provider.</div>
      )}
      {status === TxStatus.FAILED.toString() && (
        <div>Denied transaction or otherwise encountered error.</div>
      )}
    </div>
  );
};
