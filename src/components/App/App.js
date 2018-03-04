import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './App.css';

class App extends Component {
  render() {
    console.log(this.props, this.state)

    return (
      <div className="App">
        <LoginForm/>
      </div>
    );
  }
}

export default App;
