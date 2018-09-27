import React, { Component } from "react";
import "./style.css";
import Register from '../Register';
import User from "../User";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'user-view',
      isLoggedIn: false,
      username: '',
      password: ''
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
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
  }



  render() {
    return (
      <Router>
        <div className="App">Welcome to My Vinyl Collection
          <div>
            {this.state.isLoggedIn === false &&
            <div className='home-wrapper'>
              <div className="login-container">
                <h3>Login</h3>
                <div className="form-container">
                  <form onSubmit={this.onSubmit}>
                    <label>User Name: </label>
                    <input type="text" placeholder='user name' onChange={this.handleChangeUsername} username={this.state.username}></input>
                    <label>Password: </label>
                    <input type="text" placeholder='password' onChange={this.handleChangePassword} password={this.state.password}></input>
                  </form>
                </div>
              </div>
              <div className="register-container">
                <h3>New to My Vinyl Collection? Create your profile and start feeding it</h3>
                <button onClick={this.goToPage} page='register-view'>Register</button>
              </div>
            </div>
            }
          {this.state.page === 'register-view' &&
            <Route path='/register' exact component={Register} />}
          {this.state.page === 'user-view' &&
            <div className="user-view">
              <Route path='/current-user' exact component={User} />
            </div>}
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
