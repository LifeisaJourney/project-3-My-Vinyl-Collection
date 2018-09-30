import React, { Component } from "react";
import "./style.css";
import Register from '../Register';
import UserCollection from "../UserCollection";
import AlbumList from'../AlbumList';
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">

          <h1 className='welcome-screen-title'>Welcome to My Vinyl Collection</h1>
          <nav>
            <Link to='/my-collection'>My Collection  </Link>
            &nbsp;
            &nbsp;
            <Link to='/'>Log in  </Link>
            &nbsp;
            &nbsp;
            <Link to='/register'>Register </Link>
          </nav>
          <Switch>
            <PrivateRoute exact path="/albums" component={AlbumList} />
            <PrivateRoute exact path='/my-collection' component={UserCollection} />
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
