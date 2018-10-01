import React, { Component } from "react";
import "./style.css";
import Login from "../Login";
import Register from '../Register';
import PrivateRoute from "../PrivateRoute";
import UserCollection from "../UserCollection";
import AlbumList from '../AlbumList';
import AlbumDetails from '../AlbumDetails';
import BrowseUserMate from '../BrowseUserMate';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends Component {

  logOut = () => {
    localStorage.clear();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1 className='welcome-screen-title'>Welcome to My Vinyl Collection</h1>
          <nav>
            <Link to='/my-collection'>My Collection  </Link>
            &nbsp;
            &nbsp;
            <Link to='/register'>Register </Link>
            &nbsp;
            &nbsp;
            <Link to='/' onClick={this.logOut}>Log out/ Log in </Link>
          </nav>
          <Switch>
            <PrivateRoute exact path="/albums" component={AlbumList} />
            <PrivateRoute exact path='/albums/:id' component={AlbumDetails} />
            <PrivateRoute exact path='/my-collection' component={UserCollection} />
            <PrivateRoute exact path='/users/:id' component={BrowseUserMate} />
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
