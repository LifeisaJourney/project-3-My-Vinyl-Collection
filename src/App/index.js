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

  //test latter
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
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoggedIn: true
    })
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
                    <input type="text" placeholder='user name' onChange={this.handleChange} name='username' value={this.state.username}></input>
                    <label>Password: </label>
                    <input type="password" placeholder='password' onChange={this.handleChange} name='password' value={this.state.password}></input>
                    <button type="button" onClick={this.onSubmit}>login</button>
                  </form>
                </div>
              </div>
              <div className="register-container">
                <h3>New to My Vinyl Collection? Create your profile and start feeding it</h3>
                <button type="button" onClick={this.goToPage} page='register-view'>Register</button>
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
