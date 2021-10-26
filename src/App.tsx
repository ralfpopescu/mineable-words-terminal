import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Terminal } from './components/Terminal'
import { TerminalContextProvider } from "react-terminal";

function App() {
  return (
    <TerminalContextProvider>
    <div className="App">
      <Terminal />
    </div>
    </TerminalContextProvider>
  );
}

export default App;
