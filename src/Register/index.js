import React, { Component } from 'react'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      pictureSrc: '',
      city: '',
      errorMessage: ''
    }
  }
  register = async () => {
    const requestBody = JSON.stringify({


      
      method: 'POST',
      body: 
    })
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
