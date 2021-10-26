import { ReactTerminal } from "react-terminal";
import { useState } from 'react'
import { BigNumber } from "@ethersproject/bignumber";
import { commands } from './commands'


const welcomeMessage = `Welcome to MineableWords (MWORDS). Enter "options" to get started.
`

export const Terminal = () => {
    const [stagedNonce, setStagedNonce] = useState<BigNumber | null>(null)

  return (
    <ReactTerminal
      commands={commands({ stagedNonce, setStagedNonce })}
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