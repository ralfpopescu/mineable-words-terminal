import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Terminal } from './components/Terminal'
import { TerminalContextProvider } from "react-terminal";
import { MemoryRouter } from 'react-router-dom'

const FullScreen = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
`

function App() {
  return (
    <TerminalContextProvider>
      <MemoryRouter>
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
