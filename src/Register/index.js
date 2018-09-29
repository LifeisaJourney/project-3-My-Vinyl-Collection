import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      name: '',
      email: '',
      username: '',
      password: '',
      pictureSrc: '',
      city: '',
      message: '',
      valid: false,
      emailValidationMessage: '',
      passwordValidationMessage: '',
      emailBorder: '',
      passwordBorder: '',
    }
  }

  onInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  isEmailPasswordValid = () => {
    let isValid = true;
    let emailRegex = /@/;
    let specialCharacterPattern = /[!@()#$%&'*+/=?^_`{|}~-]+/;
    let numberPattern = /\d/;
    let emailRedBorder;
    let passwordRedBorder;
    let emailMessage;
    let passwordMessage;

    if (!emailRegex.exec(this.state.email)) {
      isValid = false;
      emailRedBorder = 'solid 2px red';
      emailMessage = 'Email address not valid!';
    }
    if (this.state.password.length < 7 || !specialCharacterPattern.exec(this.state.password) || !numberPattern.exec(this.state.password)) {
      isValid = false;
      passwordRedBorder = 'solid 2px red';
      passwordMessage = 'Password not valid! Password must be at least 7 characters long and include at least one number and one special character';
    }
    this.setState({
      valid: isValid,
      emailBorder: emailRedBorder,
      passwordBorder: passwordRedBorder,
      emailValidationMessage: emailMessage,
      passwordValidationMessage: passwordMessage
    });
  }

  register = async () => {
    this.isEmailPasswordValid();

    if (this.state.valid) {
      const requestBody = JSON.stringify({
        name: this.state.name,
        email: this.state.email,
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
      } else {
        localStorage.setItem('user-jwt', responseBody.token);
        this.setState({
          redirectToReferrer: true,
        });
      }
    }
  }
  render() {
    const emailStyle = {
      border: this.state.emailBorder,
      outline: 'none',
    }
    const passwordStyle = {
      border: this.state.passwordBorder,
      outline: 'none',
    }
    const { from } = this.props.location.state || { from: { pathname: "/my-collection" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <form >
          <label>Name: </label>
          <input type='text' placeholder='Name' onChange={this.onInputChange} name='name' value={this.state.name}>
          </input>
          <label>User name: </label>
          <input type='text' placeholder='User name' onChange={this.onInputChange} name='username' value={this.state.username}>
          </input>
          <label>Email: </label>
          <input type='text' placeholder='email' onChange={this.onInputChange} name='email' value={this.state.email} style={emailStyle}>
          </input>
          <p>{this.state.emailValidationMessage}</p>
          <label>Password: </label>
          <input type='password' placeholder='password' onChange={this.onInputChange} name='password' value={this.state.password} style={passwordStyle}>
          </input>
          <p>{this.state.passwordValidationMessage}</p>
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
        {
          this.state.message &&
          <h3>{this.state.message}</h3>
        }

      </div >
    )
  }
}
