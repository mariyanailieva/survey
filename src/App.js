import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Survey from  './Survey.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </header>
      <Survey />
    </div>
  );
}

export default App;
