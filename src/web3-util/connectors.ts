import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { chainIds, chainUrls } from "./config";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    chainIds.MAINNET,
    chainIds.ROPSTEN,
    chainIds.LOCAL,
    chainIds.RINKEBY,
  ],
});

export const networkConnector = new NetworkConnector({
  urls: {
    [chainIds.MAINNET]: chainUrls.MAINNET,
    [chainIds.ROPSTEN]: chainUrls.ROPSTEN,
    [chainIds.RINKEBY]: chainUrls.RINKEBY,
  },
  defaultChainId: 1,
});
