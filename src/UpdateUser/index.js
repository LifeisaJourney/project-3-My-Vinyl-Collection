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
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await (await fetch('/api/current-user', {
      method: "GET",
      headers: {
        'jwt-token': localStorage.getItem('user-jwt'),
      }
    })).json();
    this.setState({
      user: user
    });
  }

  onInputChange = evt => {
    evt.preventDefault();
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

    if (this.state.user.email && !emailRegex.exec(this.state.user.email)) {
      isValid = false;
      emailRedBorder = 'solid 2px red';
      emailMessage = 'Email address is invalid!';
    }
    if (this.state.user.password &&this.state.user.password.length < 7 || !specialCharacterPattern.exec(this.state.user.password) || !numberPattern.exec(this.state.user.password)) {
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
    if (this.state.valid) {
      const requestBody = JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        pictureSrc: this.state.pictureSrc,
        city: this.state.city
      });

      const response = await fetch
        ('/api/current-user', {
          method: 'PUT',
          body: requestBody,
          headers: {
            'Content-Type': 'application/json'
          }
        });
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

      return (
        <div>
          <div className="register-form">
            <form className="form" >
              <div className="input-container">
                <label className="register-label">Name: </label>
                <input type='text' placeholder="" onChange={this.onInputChange} name='name' value={this.state.user.name}>
                </input>
                <p>{this.state.user.name}</p>
              </div>
              <div className="input-container">
                <label className="register-label">Email: </label>
                <input type='text' placeholder={this.state.user.email} onChange={this.onInputChange} name='email' value={this.state.user.email} style={emailStyle}>
                </input>
                <p className="error-message">{this.state.emailValidationMessage}</p>
              </div>
              <div className="input-container">
                <label className="register-label">Password: </label>
                <input type='password' placeholder='Password' onChange={this.onInputChange} name='password' value={this.state.user.password} style={passwordStyle}>
                </input>
                <p className="error-message">{this.state.passwordValidationMessage}</p>
              </div>
              <div className="input-container">
                <label className="register-label">Profile Picture Url: </label>
                <input type='text' onChange={this.onInputChange} name='pictureSrc' placeholder={this.state.user.pictureSrc} value={this.state.user.pictureSrc}>
                </input>
              </div>
              <div className="input-container">
                <label className="register-label">City: </label>
                <input type='text' placeholder='City' onChange={this.onInputChange} name={this.state.user.city}
                  placheolder={this.state.user.city} value={this.state.user.city}>
                </input>
              </div>
              <div>
                {this.state.valid && (
                  <button onclick={this.change} className="register-button"><Link to='/my-collection'></Link>Save Changes </button>
                )}
              </div>
            </form>
            {!this.state.valid && (
              <button className="register-button" onClick={this.isValid}>Validate Change </button>
            )}
            {
              this.state.message &&
              <h3>{this.state.message}</h3>
            }
          </div>
        </div>
      )
    }
  }
