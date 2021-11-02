import { useEagerWithRemoteFallback } from "../../../../web3-util/util";
import { injectedConnector } from "../../../../web3-util/connectors";
import { useEffect } from "react";

export const Connect = () => {
  const {
    status,
    provider: { account, activate },
  } = useEagerWithRemoteFallback();


  useEffect(() => {
      console.log({ account, status })
    if(!account || !status) activate(injectedConnector);
  }, [account, status, activate])

  return (
    <div>
      {!account || !status ? "Connecting now..." : `Account connected: ${account}`}
    </div>
  );
};
