import { ReactTerminal } from "react-terminal";
import { useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";
import { commands } from './commands'


const welcomeMessage = `Welcome to MineableWords (MWORDS). Enter "help" to get started.
`

export const Terminal = () => {
    const provider = useWeb3React<Web3Provider>();
    const { account } = provider;
    const [stagedNonce, setStagedNonce] = useState<BigNumber | null>(null)

  return (
    <ReactTerminal
      commands={commands({ stagedNonce, setStagedNonce, account })}
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