import "./App.css";
import styled from "styled-components";
import { Terminal } from "./components/Terminal";
import { TerminalContextProvider } from "react-terminal";
import { MemoryRouter } from "react-router-dom";
import { useFullStoryWeb3 } from "./web3-util/use-fullstory-web3";
import { abi } from "./web3-util/abi";

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 8px;
`;

function App() {
  useFullStoryWeb3({ orgId: "14VR7Y", abi: abi.abi });

  return (
    <TerminalContextProvider>
      <MemoryRouter>
        <style>
          @import
          url('https://fonts.googsleapis.com/css2?family=Cutive+Mono&family=Oxygen+Mono&display=swap');
        </style>
        <div className="App">
          <FullScreen>
            <Terminal />
          </FullScreen>
        </div>
      </MemoryRouter>
    </TerminalContextProvider>
  );
}

export default App;
