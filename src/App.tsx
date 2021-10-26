import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Terminal } from './components/Terminal'
import { TerminalContextProvider } from "react-terminal";
import styled from 'styled-components'
import { DiscordIcon } from './components/DiscordIcon'
import { Bar } from './components/Bar'


const FullScreen = styled.div`
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: #55aaaa;
`

const TerminalContainer = styled.div`
position: absolute;
top: 25%;
left: 25%;
height: 500px;
`

const BarContainer = styled.div`
position: absolute;
bottom: 0;
left: 0;
right: 0;
`

function App() {
  return (
    <TerminalContextProvider>
    <div className="App">
      <FullScreen>
        <DiscordIcon />
        <TerminalContainer>
          <Terminal />
        </TerminalContainer>
        <BarContainer>
          <Bar />
        </BarContainer>
      </FullScreen>
    </div>
    </TerminalContextProvider>
  );
}

export default App;
