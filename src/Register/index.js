import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      pictureSrc: '',
      city: '',
      message: ''
    }
  }
  
  onInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  register = async () => {
    
    const requestBody = JSON.stringify({
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      pictureSrc: this.state.pictureSrc,
      city: this.state.city
    });
    const response = await fetch('/api/register', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.json();
    if (responseBody.status === 409 || responseBody.status === 400) {
      this.setState({
        message: responseBody.message
      });
      return;
    }
    localStorage.setItem('user-jwt', JSON.stringify(responseBody.token));
    this.props.onLogin();
    console.log('click')
  }


  render() {
    return (
      <div>
        <form >
          <label>Name: </label>
          <input type='text' placeholder='Name' onChange={this.onInputChange} name='name' value={this.state.name}>
          </input>
          <label>User name: </label>
          <input type='text' placeholder='User name' onChange={this.onInputChange} name='username' value={this.state.username}>
          </input>
          <label>Password: </label>
          <input type='password' placeholder='password' onChange={this.onInputChange} name='password' value={this.state.password}>
          </input>
          <label>Profile Picture </label>
          <input type='file' onChange={this.onInputChange} name='pictureSrc' accept='.png, .jpg, .jpeg' value={this.state.pictureSrc}>
          </input>
          <label>City: </label>
          <input type='text' placeholder='City' onChange={this.onInputChange} name='city' value={this.state.city}>
          </input>
        </form>
        <button onClick={this.register}>
            Register
          </button>
          {this.state.message &&
          <h3>{this.state.message}</h3>}

      </div>
    )
  }
}
