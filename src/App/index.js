import React, { Component } from "react";
import "./style.css";
import Register from '../Register';
import User from "../User";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('user-jwt');
    this.state = {
      page: 'home',
      isLoggedIn: token || false,
      username: '',
      password: '',
      message: ''
    }
  }

  //test later
  goToRegister = (event) => {
    event.preventDefault();
    console.log('click')
    this.setState({
      page: 'register-view'
    })
  }

  logIn = async () => {
    const requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    const response = await fetch('/api/login', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.json();
    if (response.status === 401) {
      this.setState({
        errorMessage: responseBody.message
      });
      return;
    }
    this.props.onLogIn();
    localStorage.setItem('user-jwt', JSON.stringify(responseBody.Token));
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
              {this.state.page === 'home' &&this.state.isLoggedIn === false &&
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
                      {this.state.message &&
                        <h3>{this.state.message}</h3>}
                    </div>
                  </div>
                  <div className="register-container">
                    <h3>New to My Vinyl Collection? Create your profile and start feeding it</h3>
                    <button type="button" onClick={this.goToRegister} >
                    <Link to='/register'>Register</Link></button>
                  </div>
                </div>
              
              }
      
                <Route path='/register'
                  render={(props) => <Register userName={this.state.username} password={this.state.password} onLogin={this.onLogIn} />}
                />
              
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
