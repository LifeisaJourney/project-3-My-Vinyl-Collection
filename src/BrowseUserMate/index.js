import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AlbumDetails from '../AlbumDetails';
import "./style.css";

export default class UserCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userAlbums: [],
        }
    }

    componentDidMount = async () => {
        this.fetchUser();
        this.fetchAlbums();
    }

    fetchUser = async () => {
        const id = this.props.match.params.id;
        const user = await (await fetch(`/api/users/${id}`)).json();
        this.setState({
            user: user
        });
    }

    fetchAlbums = async () => {
        const id = this.props.match.params.id;
        const albums = await (await fetch(`/api/users/${id}/albums`)).json();
        this.setState({
            userAlbums: albums
        });
    }

    render() {
        return (
            <div>
                <div className="user-collection-container">
                    <h1 className='personalize-welcome'>Welcome to {this.state.user.name}`\'`s Page!</h1>
                    <div className="user-container">
                        <div className="user-img-container">
                            <img className='user-profile-pic' src={this.state.user.pictureSrc} alt='user-picture' />
                        </div>
                        <div className="user-info">
                            <h2>User Name: {this.state.user.username}</h2>
                            <h2>Email: {this.state.user.email}</h2>
                            <h2>City: {this.state.user.city}</h2>
                        </div>
                    </div>
                    <div className="album-collection-container">
                        <div className='vinyl-collection'>
                            <h2 className='vinyl-collection-h2'>{this.state.user.name}'s Vinyl Collection</h2>
                        </div>
                        {this.state.userAlbums.length > 0 && this.state.userAlbums.map(userAlbum => {
                            return (
                                <div className="album-container" onClick={this.albumClick}>
                                    <Link to={`/albums/${userAlbum.id}`}>
                                        <div className="album-image-container">
                                            <img className="album-image" src={`../images/${userAlbum.coverPictureSrc}`} alt="album cover" />
                                        </div>
                                        <div className="album-info-container">
                                            <h3>{userAlbum.title}</h3>
                                            <h3>{userAlbum.artist}</h3>
                                        </div>
                                    </Link>
                                    <Route exact path={`/albums/${userAlbum.id}`}
                                        render={(props) => <AlbumDetails {...props} />} />
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
