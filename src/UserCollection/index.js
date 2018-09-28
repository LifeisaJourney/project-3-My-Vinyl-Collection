import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserAlbum from '../UserAlbum';
import "./style.css";

export default class UserCollection extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('user-jwt');
        this.state = {
            isLoggedIn: token,
            user: '',
            userAlbums: [],
        }
    }
    ComponentDidMount = async () => {
        const user = await (await fetch('/api/current-user', {
            method: GET,
            headers: {
                'jwt-token': this.state.isLoggedIn,
            }
        })).json();

        const albums = await (await fetch('/api/current-user/albums', {
            method: GET,
            headers: {
                'jwt-token': this.state.isLoggedIn,
            }
        })).json();

        this.setState({
            user: user,
            userAlbums: albums
        });
    }
    render() {
        return (
            <div className="user-collection-container">
                <h1>Welcome{this.state.user.name}</h1>
                <div className="user-container">
                    <div className="user-img-container">
                        <img src={this.state.user.pictureSrc} alt='user-picture' />
                    </div>
                    <div className="user-info">
                        <h2>User Name: {this.state.user.username}</h2>
                        <h2>Email: {this.state.user.email}</h2>
                        <h2>City: {this.state.user.city}</h2>
                    </div>
                </div>
                <div className="album-collection-container">
                    <h2>Your Vinyl Collection</h2>
                    {this.state.userAlbums && this.state.userAlbums.map(userAlbum => {
                        <UserAlbum />
                    }
                    )}
                </div>
                <button> <Link to='/albums'>"Add New Album"</Link> </button>
                <Route path="/albums" component={UserAlbum}></Route>
            </div>
        )
    }

}









