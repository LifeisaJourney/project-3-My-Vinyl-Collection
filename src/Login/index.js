import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link,   Redirect, withRouter } from 'react-router-dom';
import UserCollection from "../UserCollection";


export default class Login extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('user-jwt');
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: '',
      message: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (event) => {
    event.preventDefault();
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
        message: responseBody.message
      });
      return;
    }
    
    localStorage.setItem('user-jwt', JSON.stringify(responseBody.token));
    this.setState({
      redirectToReferrer: true,
    })
  }
  
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from}  />;
    }
    return (
      <div>
        <div className='home-wrapper'>
          <div className="login-container">
            <h3>Login</h3>
            <div className="form-container">
              <form onSubmit={this.login}>
                <label>User Name: </label>
                <input type="text" placeholder='user name' onChange={this.handleChange} name='username' value={this.state.username}></input>
                <label>Password: </label>
                <input type="password" placeholder='password' onChange={this.handleChange} name='password' value={this.state.password}></input>
                <button>login</button>
              </form>
              {this.state.message &&
                <h3>{this.state.message}</h3>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
