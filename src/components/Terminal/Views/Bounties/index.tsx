import * as ethers from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { serializeData, deserializeData } from "../../../../utils/data-utils";
import { getCurrentBounties, BountyType } from "../../../../web3-util/methods";
import { Ellipsis } from "../../../Ellipsis";
import { Line } from "../../../Line";

const Container = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 300px 500px;
  grid-template-rows: repeat(auto-fit);
`;

type BountiesProps = { bountiesId: string };

export const Bounties = ({ bountiesId }: BountiesProps) => {
  const { library } = useWeb3React<Web3Provider>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const data = deserializeData<BountyType[] | null>(queryParams[bountiesId]);
  const [bounties, setBounties] = useState<BountyType[] | null>(data);

  useEffect(() => {
    const getMWords = async () => {
      if (library && !bounties && !data) {
        const mwords = await getCurrentBounties({ library });
        setBounties(mwords);
        navigate(
          addQueryParamsToNavPath(
            { [bountiesId]: serializeData<BountyType[]>(mwords) },
            location.search
          )
        );
      }
    };

    getMWords();
  }, [library, bounties, bountiesId, location, navigate, data]);

  return (
    <Container>
      {!bounties && (
        <>
          Loading current bounties...
          <Ellipsis />
        </>
      )}
      {bounties?.length === 0 ? "No bounties currently." : ""}
      {bounties?.length && (
        <GridContainer>
          <div>word</div>
          <div>offer (ETH)</div>
          <div>buyer</div>
          <Line />
          <Line />
          <Line />
          {bounties.map((bounty) => (
            <>
              <div>{bounty.decoded}</div>
              <div>{ethers.utils.formatEther(bounty.value)}</div>
              <div>{bounty.buyer}</div>
            </>
          ))}
        </GridContainer>
      )}
    </Container>
  );
};
