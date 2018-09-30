import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Album from "../Album";

export default class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      user: {},
    }
  }
  componentDidMount = async () => {
    this.fetchAlbums();
    this.fetchUser();
  }
  fetchAlbums = async () => {
    const response = await fetch('api/albums')
    const albums = await response.json();
    this.setState({
      albums: albums
    })
  }
  fetchUser = async () => {
    const response = await fetch('/api/current-user', {
      headers: {
        'jwt-token': localStorage.getItem('user-jwt')
      }
    })
    const user = await response.json();
    this.setState({
      user: user
    })
  }

  addAlbum = async id => {
    console.log(id)
    await fetch('api/current-user/albums', {
      method: 'POST',
      body: JSON.stringify({albumId: id}),
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('user-jwt')
      }
    })
    this.fetchUser();

  }

  render() {
    return (
      // <Router>
        <div>
          <div className="albuns-list-page">
            <h1>Select one of the albums from our list</h1>
            <div className="album-list-container">
              {this.state.albums.map(album => {
                return (
                  <Album
                    key={album.id}
                    title={album.title}
                    artist={album.artist}
                    releaseYear={album.releaseYear}
                    genre={album.genre}
                    coverPictureSrc={album.coverPictureSrc}
                    rating={album.rating}
                    description={album.description}
                  addedAlbum={this.state.user.albumId === album.id}
                  onClickAddButton={() => this.addAlbum(album.id)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      // </Router>
    )
  }
}
