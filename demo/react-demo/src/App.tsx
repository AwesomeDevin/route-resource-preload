import React from 'react';
import { HashRouter } from 'react-router-dom'
import 'ling_core/lingcore.css'

import Router from './router';

import './App.css';


function App() {



  return (
    <HashRouter>
    <div className="App">
      <header className="App-header">
          <a className="App-link" target='_blank' href="https://github.com/AwesomeDevin/route-resource-preload" rel="noreferrer">DOCS</a>
        <h1>route-resource-preload</h1>
        <p style={{width: '30em', margin: 0}}>Focus on <strong>improving the first screen loading speed of applications</strong> and <strong>providing the best user experience.</strong> 🚀🚀🚀</p>
       
        <Router />
      </header>
    </div>
    </HashRouter>
  );
}

export default App;
