import { ReactTerminal } from "react-terminal";
import { useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";
import { getCommands } from './commands'


const welcomeMessage = `Welcome to MineableWords (MWORDS). Enter "help" to get started.
`

enum MiningStatus {
    WAITING_TO_START,
    STARTED,
    WAITING_TO_STOP,
    STOPPED,
  }


export const Terminal = () => {
    const provider = useWeb3React<Web3Provider>();
    const { account } = provider;
    const [miningStatus, setMiningStatus] = useState<MiningStatus>(
        MiningStatus.WAITING_TO_START
      );
    console.log('rerender terminal', { miningStatus })

  const getMiningStatus = () => {
      console.log('get mining status called', miningStatus)
      return miningStatus;
    };

  return (
    <ReactTerminal
      commands={getCommands({ account, getMiningStatus, setMiningStatus })}
      welcomeMessage={welcomeMessage}
      themes={{
        theme: {
          themeBGColor: "#0f0f0f",
          themeToolbarColor: "#DBDBDB",
          themeColor: "#FFFEFC",
          themePromptColor: "#FFEA00"
        }
      }}
      theme="theme"
    />
  );
}