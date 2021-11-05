import { ReactTerminal } from "react-terminal";
import { useState, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

    const getMiningStatus = useCallback(() => miningStatus, [miningStatus])
    const location = useLocation();
    const navigate = useNavigate();

    const commands = useMemo(() => getCommands({ account, getMiningStatus, setMiningStatus, location, navigate }), 
    [account, setMiningStatus, getMiningStatus, location, navigate])

  return (
    <ReactTerminal
      commands={commands}
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