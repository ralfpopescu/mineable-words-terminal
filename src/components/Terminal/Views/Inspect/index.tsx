import { useEffect, useState } from "react";
import styled from "styled-components";
import * as ethers from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getMWordsByOwner } from "../../../../web3-util/methods";
import { Ellipsis } from "../../../Ellipsis";
import { Highlight } from "../../../Highlight";

const Container = styled.div``;

type InspectProps = { ownerAddress: ethers.BigNumber };

export const Inspect = ({ ownerAddress }: InspectProps) => {
  const { library } = useWeb3React<Web3Provider>();
  const [inspect, setInspect] = useState<string[] | null>(null);

  useEffect(() => {
    const getMWords = async () => {
      if (library && !inspect) {
        const mwords = await getMWordsByOwner({ library, ownerAddress });
        setInspect(mwords);
      }
    };

    getMWords();
  }, [library, inspect, ownerAddress]);

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
