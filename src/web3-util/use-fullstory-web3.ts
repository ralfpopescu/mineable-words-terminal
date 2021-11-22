import { useEffect } from "react";
//@ts-ignore
import abiDecoder from "abi-decoder";
import * as FullStory from "@fullstory/browser";

type CallParam = { to: string; from: string; data: string; gas: string; value: string };

interface RequestArguments {
  method: string;
  params?: CallParam[] | object;
}

declare global {
  interface Window {
    ethereum: {
      request: (args: RequestArguments) => Promise<any>;
    };
  }
}

window.ethereum = window.ethereum || {};

type DecodedParam = { name: string; value: string; type: string };
const normalizeParams = (params: DecodedParam[]) => {
  return params
    .map((param, i) => ({
      [`paramName${i}`]: param.name,
      [`paramValue${i}`]: param.value,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

const significantEvents = ["eth_call", "eth_sendTransaction"];

type UseFullStoryWeb3Args = { orgId: string; abi: object[] };

export const useFullStoryWeb3 = ({ orgId, abi }: UseFullStoryWeb3Args) => {
  useEffect(() => {
    FullStory.init({ orgId });
    const request = window.ethereum.request;

    if (window.ethereum) {
      abiDecoder.addABI(abi);
      FullStory.setUserVars({ hasWeb3: true });

      window.ethereum.request = (args) => {
        if (significantEvents.includes(args.method)) {
          try {
            if (args.params) {
              if (Array.isArray(args.params)) {
                args.params.forEach((param) => {
                  if (param.data) {
                    const decodedData = abiDecoder.decodeMethod(param.data);
                    console.log({ decodedData });
                    const eventName = decodedData.name || args.method;
                    const decodedDataParams = normalizeParams(decodedData.params);
                    const eventData = {
                      ...decodedDataParams,
                      to: param.to,
                      from: param.from,
                      gas: param.gas,
                      value: param.value,
                    };
                    FullStory.event(eventName, eventData);
                  }
                });
              }
            }
          } catch (e) {}
        }
        return request(args);
      };
    } else {
      FullStory.setUserVars({ hasWeb3: false });
    }
  });
};
