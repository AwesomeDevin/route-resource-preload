import React from 'react';
import { BrowserRouter } from 'react-router-dom'


import Router from './router';

import logo from './logo.svg';
import './App.css';


function App() {



  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router />
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
