import React, { Component } from "react";
import "./style.css";
import Register from '../Register';
// import UserCollection from "../UserCollection";
import Login from "../Login";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('user-jwt');
    this.state = {
      isLoggedIn: false,
      buttonIsClicked: false,
      username: '',
      password: '',
      message: ''
    }
  }

  onLogin = () => {
    console.log("logging in")
    this.setState({
      isLoggedIn: true,
    })
  }
  
  buttonClick = () => {
    this.setState({
      buttonIsClicked: true
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Welcome to My Vinyl Collection</h1>
          {
            this.state.isLoggedIn === false && this.state.buttonIsClicked === false && (
              <div className="view-wrapper">
                <div className='login-container'>
                  <Login 
                  username={this.state.username}
                  password={this.state.password}
                  message={this.state.message}
                  onLogin={this.onLogin} />
                </div>
                <div className='register-container'>
                  <h3>New to My Vinyl Collection? Create your profile and start feeding it</h3>
                  <button onClick={this.buttonClick}>
                    <Link to='/register'>Register</Link>
                  </button>
                </div>
              </div>
            )
          }
          {
            this.state.isLoggedIn === false && this.state.buttonIsClicked === true && (
              <Route path='/register'
                render={(props) => <Register onLogin={this.onLogin} />} />
            )
          }
        {
          this.state.isLoggedIn === true && (
            // <Route path='/current-user' exact component={UserCollection} />
            <div>hello world</div>
            // console.log("hi")
          )
        }
        </div>
      </Router >
    );
  }
}

export default App;
