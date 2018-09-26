import React, { Component } from "react";
import "./style.css";
import Login from '../Login';
import Register from '../Register';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: 'landing-page',


    }
  }
  render() {
    return <div className="App">Hello World</div>;
  }
}

export default App;
