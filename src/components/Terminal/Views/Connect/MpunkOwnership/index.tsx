import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import * as ethers from "ethers";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../../utils";
import { serializeData, deserializeData } from "../../../../../utils/data-utils";
import { isMPunkOwner } from "../../../../../web3-util/methods";
import { Ellipsis } from "../../../../Ellipsis";

type ConnectProps = { connectId: string };

export const MPunkOwnershipStatus = ({ connectId }: ConnectProps) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const data = deserializeData<boolean | null>(queryParams[connectId]);
  const [isOwner, setIsOwner] = useState<boolean | null>(data);

  useEffect(() => {
    const getStatus = async () => {
      if (library && isOwner === null) {
        const isMpunkOwner = await isMPunkOwner({
          library,
          ownerAddress: ethers.BigNumber.from(account),
        });
        setIsOwner(isMpunkOwner);
        navigate(
          addQueryParamsToNavPath(
            { [connectId]: serializeData<boolean>(isMpunkOwner) },
            location.search
          )
        );
      }
    };

    getStatus();
  }, [library, isOwner, account, connectId, location, navigate]);

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
