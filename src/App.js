import React, { Component } from 'react';
import Counter from './Counter';
import TDEE from './TDEE';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TUHMA VAI KILTTI</h1>
        </header>
        <Counter />
        <header className="App-header">
          <h1 className="App-title">KALORILASKURI</h1>
        </header>
        <TDEE />
      </div>
    );
  }
}

export default App;
