import styled from "styled-components";
import { useEagerWithRemoteFallback } from "../../../../web3-util/util";
import { injectedConnector } from "../../../../web3-util/connectors";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MINEABLEWORDS_ADDR, network } from "../../../../web3-util/config";
import { MPunkOwnershipStatus } from "./MpunkOwnership";
import { getQueryParamsFromSearch, addQueryParamsToNavPath } from "../../../../utils";
import { ConnectionStatus } from "../../../../utils/statuses";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(auto-fit);
`;

type ConnectProps = { connectId: string; mpunkOwnerId: string };

export const Connect = ({ connectId, mpunkOwnerId }: ConnectProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParamsFromSearch(location.search);
  const connectionStatus = queryParams[connectId];
  console.log({ connectionStatus, queryParams, connectId });

  const {
    status,
    provider: { account, activate, error },
  } = useEagerWithRemoteFallback();

  useEffect(() => {
    if ((!account || !status) && connectionStatus === ConnectionStatus.INITIATED.toString()) {
      activate(injectedConnector);
      navigate(addQueryParamsToNavPath({ [connectId]: ConnectionStatus.SUCCESS }, location.search));
    }
  }, [account, status, activate, connectId, location, navigate, connectionStatus]);

  useEffect(() => {
    if (error && !ConnectionStatus.INITIATED.toString()) {
      console.log({ error });
      navigate(addQueryParamsToNavPath({ [connectId]: ConnectionStatus.FAILED }, location.search));
    }
  });

  return (
    <GridContainer>
      {connectionStatus === ConnectionStatus.INITIATED.toString() ? (
        "Connecting now..."
      ) : connectionStatus === ConnectionStatus.SUCCESS.toString() ? (
        <>
          <div>Account connected:</div>
          <div>{account}</div>
          <div>Network:</div>
          <div>{network}</div>
          <div>Contract address:</div>
          <div>{MINEABLEWORDS_ADDR}</div>
          <MPunkOwnershipStatus mpunkOwnerId={mpunkOwnerId} />
        </>
      ) : (
        <div>
          {connectionStatus}
          Could not connect to web3. Do you have an Ethereum provider? Recommended:{" "}
          <a href="https://metamask.io/">Metamask</a>{" "}
        </div>
      )}
    </GridContainer>
  );
};
