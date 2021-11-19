import styled from "styled-components";
import { useEagerWithRemoteFallback } from "../../../../web3-util/util";
import { injectedConnector } from "../../../../web3-util/connectors";
import { useEffect } from "react";
import { MINEABLEWORDS_ADDR, network } from "../../../../web3-util/config";
import { MPunkOwnershipStatus } from "./MpunkOwnership";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(auto-fit);
`;

type ConnectProps = { connectId: string };

export const Connect = ({ connectId }: ConnectProps) => {
  const {
    status,
    provider: { account, activate, error },
  } = useEagerWithRemoteFallback();

  useEffect(() => {
    if (!account || !status) activate(injectedConnector);
  }, [account, status, activate]);

  if (error)
    return (
      <div>
        Could not connect to web3. Do you have an Ethereum provider? Recommended:{" "}
        <a href="https://metamask.io/">Metamask</a>{" "}
      </div>
    );

  return (
    <GridContainer>
      {!account || !status ? (
        "Connecting now..."
      ) : (
        <>
          <div>Account connected:</div>
          <div>{account}</div>
          <div>Network:</div>
          <div>{network}</div>
          <div>Contract address:</div>
          <div>{MINEABLEWORDS_ADDR}</div>
          <MPunkOwnershipStatus connectId={connectId} />
        </>
      )}
    </GridContainer>
  );
};
