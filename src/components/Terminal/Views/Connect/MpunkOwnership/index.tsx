import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import * as ethers from "ethers";
import {isMPunkOwner} from "../../../../../web3-util/methods";
import {Ellipsis} from "../../../../Ellipsis";

export const MPunkOwnershipStatus = () => {
  const {library, account} = useWeb3React<Web3Provider>();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      if (library && isOwner === null) {
        console.log("getting mewords");
        const isMpunkOwner = await isMPunkOwner({
          library,
          ownerAddress: ethers.BigNumber.from(account),
        });
        setIsOwner(isMpunkOwner);
      }
    };

    getStatus();
  }, [library, isOwner, account]);

  return (
    <>
      <div>Mpunk Ownership Status:</div>
      {isOwner === null && (
        <>
          <Ellipsis />
        </>
      )}
      {isOwner === false && <div>Not detected</div>}
      {isOwner === true && <div>Detected</div>}
    </>
  );
};
