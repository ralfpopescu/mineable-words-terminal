import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getAllDecodedMWords } from "../../../../web3-util/methods";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { serializeData, deserializeData } from "../../../../utils/data-utils";
import { Ellipsis } from "../../../Ellipsis";

const Container = styled.div``;

type RecentlyMinedProps = { recentId: string };

export const RecentlyMined = ({ recentId }: RecentlyMinedProps) => {
  const { library } = useWeb3React<Web3Provider>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const data = deserializeData<string[] | null>(queryParams[recentId]);
  const [recentlyMined, setRecentlyMined] = useState<string[] | null>(data);

  useEffect(() => {
    const getMWords = async () => {
      if (library && !recentlyMined) {
        console.log("getting mewords");
        const mwords = await getAllDecodedMWords({ library });
        setRecentlyMined(mwords);
        navigate(
          addQueryParamsToNavPath({ [recentId]: serializeData<string[]>(mwords) }, location.search)
        );
      }
    };

    getMWords();
  }, [library, recentlyMined, recentId, navigate, location]);

  return (
    <Container>
      {!recentlyMined && (
        <>
          Loading mwords
          <Ellipsis />
        </>
      )}
      {recentlyMined && !recentlyMined.length && "No mwords yet."}
      {recentlyMined && recentlyMined.length && recentlyMined.join(", ")}
    </Container>
  );
};
