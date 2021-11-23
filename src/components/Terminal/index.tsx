import { ReactTerminal } from "react-terminal";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getCommands } from "./commands";

const welcomeMessage = `Welcome to mineable_words (mwords). Enter "help" to get started.
`;

const errorMessage = `Command not recognized.`;
export const Terminal = () => {
  const provider = useWeb3React<Web3Provider>();
  const { account } = provider;
  const location = useLocation();
  const navigate = useNavigate();

  const commands = useMemo(
    () => getCommands({ account, location, navigate }),
    [account, location, navigate]
  );

  return (
    <ReactTerminal
      commands={commands}
      welcomeMessage={welcomeMessage}
      errorMessage={errorMessage}
      prompt={"=>"}
      style={{ fontSize: "8px" }}
      themes={{
        theme: {
          themeBGColor: "#0f0f0f",
          themeToolbarColor: "#DBDBDB",
          themeColor: "#FFFEFC",
          themePromptColor: "yellow",
        },
      }}
      theme="theme"
    />
  );
};
