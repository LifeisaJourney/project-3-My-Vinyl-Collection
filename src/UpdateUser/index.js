import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      message: '',
      valid: false,
      emailValidationMessage: '',
      passwordValidationMessage: '',
      emailBorder: '',
      passwordBorder: '',
    }
  }
  componentDidMount = async () => {
    const user = await (await fetch('/api/current-user', {
      method: "GET",
      headers: {
        'jwt-token': this.state.isLoggedIn,
      }
    })).json();
    this.setState({
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password,
      pictureSrc: this.state.user.pictureSrc,
      city: this.state.user.city,
    });
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

    if (!emailRegex.exec(this.state.user.email)) {
      isValid = false;
      emailRedBorder = 'solid 2px red';
      emailMessage = 'Email address is invalid!';
    }
    if (this.state.user.password.length < 7 || !specialCharacterPattern.exec(this.state.user.password) || !numberPattern.exec(this.state.user.password)) {
      isValid = false;
      passwordRedBorder = 'solid 2px red';
      passwordMessage = 'Password is invalid! Password must be at least 7 characters long and include at least one number and one special character';
    }
    this.setState({
      valid: isValid,
      emailBorder: emailRedBorder,
      passwordBorder: passwordRedBorder,
      emailValidationMessage: emailMessage,
      passwordValidationMessage: passwordMessage
    });
  }

  isValid = () => {
    this.isEmailPasswordValid();
  }


  change = async (evt) => {
    evt.preventDefault();
    const requestBody = JSON.stringify({
      [evt.target.name]: evt.target.value
    });
    const response = await fetch
      ('/api//current-user/update', {
        method: 'PUT',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  render() {
    return (
      <div>
        <div className="register-form">
          <form className="form" >
            <div className="input-container">
              <label className="register-label">Name: </label>
              <input type='text' placeholder={this.state.user.name} onChange={this.onInputChange} name='name' value={this.state.name}>
              </input>
            </div>
            <div className="input-container">
              <label className="register-label">Email: </label>
              <input type='text' placeholder={this.state.user.email} onChange={this.onInputChange} name='email' value={this.state.email} style={emailStyle}>
              </input>
              <p className="error-message">{this.state.emailValidationMessage}</p>
            </div>
            <div className="input-container">
              <label className="register-label">Password: </label>
              <input type='password' placeholder='Password' onChange={this.onInputChange} name='password' value={this.state.password} style={passwordStyle}>
              </input>
              <p className="error-message">{this.state.passwordValidationMessage}</p>
            </div>
            <div className="input-container">
              <label className="register-label">Profile Picture Url: </label>
              <input type='text' onChange={this.onInputChange} name='pictureSrc' value={this.state.pictureSrc}>
              </input>
            </div>
            <div className="input-container">
              <label className="register-label">City: </label>
              <input type='text' placeholder='City' onChange={this.onInputChange} name={this.state.user.city} value={this.state.city}>
              </input>
            </div>
            <div>
            {this.state.valid && (
            <button onclick={this.change} className="reigster-button"><Link></Link>Change name</button>
          )}
          </div>
            <button onclick={this.change}><Link></Link>Change name</button>
          </form>
        </div>
      </div>
    )
  }
}
