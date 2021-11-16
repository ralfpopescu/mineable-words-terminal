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
font-size: 8px;
`

function App() {
  return (
    <TerminalContextProvider>
      <MemoryRouter>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Oxygen+Mono&display=swap');
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
