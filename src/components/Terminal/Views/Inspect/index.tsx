import { useEffect, useState } from "react";
import styled from "styled-components";
import * as ethers from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getMWordsByOwner } from "../../../../web3-util/methods";
import { Ellipsis } from "../../../Ellipsis";
import { Highlight } from "../../../Highlight";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { serializeData, deserializeData } from "../../../../utils/data-utils";

const Container = styled.div``;

type InspectProps = { ownerAddress: ethers.BigNumber; inspectId: string };

export const Inspect = ({ ownerAddress, inspectId }: InspectProps) => {
  const { library } = useWeb3React<Web3Provider>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const data = deserializeData<string[] | null>(queryParams[inspectId]);
  console.log({ data, inspectId, queryParams });
  const [inspect, setInspect] = useState<string[] | null>(data);

  useEffect(() => {
    const getMWords = async () => {
      if (library && !inspect) {
        const mwords = await getMWordsByOwner({ library, ownerAddress });
        setInspect(mwords);
        console.log({ mwords, serialized: serializeData<string[]>(mwords) });
        navigate(
          addQueryParamsToNavPath({ [inspectId]: serializeData<string[]>(mwords) }, location.search)
        );
      }
    };

    getMWords();
  }, [library, inspect, ownerAddress, inspectId, location, navigate]);

  return (
    <Container>
      {!inspect && (
        <>
          Loading mwords
          <Ellipsis />
        </>
      )}
      {inspect && !inspect.length && "This wallet has no mwords."}
      {inspect && inspect.length && (
        <div>
          mwords owned by {ownerAddress._hex}: <Highlight>{inspect.join(", ")}</Highlight>
        </div>
      )}
    </Container>
  );
};
