import React, { Component } from "react";
import "./style.css";
// import Login from '../Login';
// import Register from '../Register';
// import User from "../User";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'user-view',
      isLoggedIn: 'false'
    }
  }
  goToPage = page => {
    this.setState({
      page: page
    })
  }
  onLogIn = () => {
    this.setState({
      isLoggedIn: true,
    })
  }


  render() {
    return (<div className="App">Hello World
    {/* {!this.state.isLoggedIn &&
        <div className="login-container">
          <Login
          onLogIn={this.onLogIn}
          />
        </div>
        <div className="register-container">
          <h3>New to My Vinyl Collection? Create your profile and start feeding it</h3>
          <button onClick={this.goToPage} page='register-view'>Register</button>
        </div>}
      {this.state.page === 'register-view' &&
      <Register />}
      {this.state.page === 'user-view' &&
        <div className="user-view">
          <User />
        </div>} */}
    </div>
    );
  }
}

export default App;
