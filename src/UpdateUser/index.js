import React, { Component } from 'react'

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
     
    }
    this.componentDidMount = async () => {
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
  change = async (evt) => {
    evt.preventDefault();
    const requestBody = JSON.stringify({
      [evt.target.name]: evt.target.value
    });
    const response = await fetch 
    ('/api//current-user', {
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
          </div>
          <div className="input-container">
            <label className="register-label">Password: </label>
            <input type='password' placeholder='Password' onChange={this.onInputChange} name='password' value={this.state.password} style={passwordStyle}>
            </input>
            
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
          <button onclick={this.change}>Change name</button>
        </form>
      </div>
    )
  }
}
