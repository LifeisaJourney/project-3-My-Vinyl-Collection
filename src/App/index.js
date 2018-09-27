import React, { Component } from "react";
import "./style.css";
import Login from '../Login';
import Register from '../Register';
import User from "../User"

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
    {!this.state.isLoggedIn &&
        <div className="login-container">
          <Login
          onLogIn={this.onLogIn}
          />
        </div>
        <div className="register-container">
          <Register />
        </div>}
      {this.state.page === 'user-view' &&
        <div className="user-view">
          <User />
        </div>}
    </div>
    );
  }
}

export default App;
