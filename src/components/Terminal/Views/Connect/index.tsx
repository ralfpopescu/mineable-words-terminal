import styled from 'styled-components'
import { useEagerWithRemoteFallback } from "../../../../web3-util/util";
import { injectedConnector } from "../../../../web3-util/connectors";
import { useEffect } from "react";
import { MINEABLEWORDS_ADDR, network } from "../../../../web3-util/config";

const GridContainer = styled.div`
display: grid;
grid-template-columns: 1fr 3fr;
grid-template-rows: repeat(auto-fit);
`

export const Connect = () => {
  const {
    status,
    provider: { account, activate },
  } = useEagerWithRemoteFallback();


  useEffect(() => {
    if(!account || !status) activate(injectedConnector);
  }, [account, status, activate])

  return (
    <GridContainer>
      {!account || !status ? "Connecting now..." : 
      <>
          <div>Account connected:</div>
          <div>{account}</div>
          <div>Network:</div>
          <div>{network}</div>
          <div>Contract address:</div>
          <div>{MINEABLEWORDS_ADDR}</div>
          <div>Mpunk Ownership Status:</div>
          <div>Not detected</div>
          </>
      }
    </GridContainer>
  );
};
