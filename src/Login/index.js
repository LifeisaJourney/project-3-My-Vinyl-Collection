import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('user-jwt');
    this.state = {
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
    this.props.onLogin();
    localStorage.setItem('user-jwt', JSON.stringify(responseBody.token));
  }
  render() {
    return (
      <div>
        <div className='home-wrapper'>
          <div className="login-container">
            <h3>Login</h3>
            <div className="form-container">
              <form>
                <label>User Name: </label>
                <input type="text" placeholder='user name' onChange={this.handleChange} name='username' value={this.state.username}></input>
                <label>Password: </label>
                <input type="password" placeholder='password' onChange={this.handleChange} name='password' value={this.state.password}></input>
                <button onClick={this.login}>login</button>
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
