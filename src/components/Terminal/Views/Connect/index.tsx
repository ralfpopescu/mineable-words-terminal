import { useEagerWithRemoteFallback } from "../../../../web3-util/util";
import { injectedConnector } from "../../../../web3-util/connectors";
import { useEffect } from "react";
import { MINEABLEWORDS_ADDR, network } from "../../../../web3-util/config";

export const Connect = () => {
  const {
    status,
    provider: { account, activate },
  } = useEagerWithRemoteFallback();


  useEffect(() => {
    if(!account || !status) activate(injectedConnector);
  }, [account, status, activate])

  return (
    <div>
      {!account || !status ? "Connecting now..." : 
      <>
      <div>Account connected: {account}</div>
      <div>Network: {network}</div>
      <div>Contract address: {MINEABLEWORDS_ADDR}</div>
      </>
      }
    </div>
  );
};
