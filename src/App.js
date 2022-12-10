import logo from './logo.svg';
import './App.css'
import React, { useEffect, useState } from 'react';
import TicTactToe from './Application/TicTacToe';
import TestApp from './TestApp';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">       
        <TicTactToe/>

        {/* <TestApp/> */}
      </header>
    </div>
  );
}

export default App;
