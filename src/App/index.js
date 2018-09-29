import React, { Component } from "react";
import "./style.css";
import Register from '../Register';
import UserCollection from "../UserCollection";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <h1 className='welcome-screen-title'>Welcome to My Vinyl Collection</h1>

          <nav>
            <Link to='/'>Home Page  </Link>
            &nbsp;
            &nbsp;
            <Link to='/login'>Log in  </Link>
            &nbsp;
            &nbsp;
            <Link to='/register'>Register </Link>
          </nav>
          <PrivateRoute path="/" exact component={UserCollection} />
          <Route path="/login" exact component={Login} />
          <Route path='/register' exact component={Register} />
        </div>
      </Router >
    );
  }
}

export default App;
