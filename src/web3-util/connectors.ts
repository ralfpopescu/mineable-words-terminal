import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { chainIds, chainUrls } from "./config";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    chainIds.MAINNET,
    chainIds.ROPSTEN,
    chainIds.LOCAL,
  ],
});

export const networkConnector = new NetworkConnector({
  urls: {
    1: chainUrls.MAINNET,
    3: chainUrls.ROPSTEN,
  },
  defaultChainId: 1,
});
