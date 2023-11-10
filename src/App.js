import React, { Component } from 'react';
import './App.css';
import TTSGame from './TTSGame';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Mendatar</h4>
            <TTSGame />
          </div>
          <div className="col">
            <h4>Menurun</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
