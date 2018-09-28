import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class AlbumList extends Component {
  constructor(props) {
    super(props);
    albums: [],
    user: {}
    favoriteAlbum: []
    // isAddButtonClicked: false
  }
  componentDidMount = async () => {
    this.fetchAlbuns();
    this.fetchUser();
  }
  fetchAlbuns = async () => {
    const response = await fetch('api/albuns')
    const albuns = await response.json();
    this.setState({
      movies: movies
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
    await fetch('api/current-user', {
      method: 'PUT',
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
      <div className="albuns-list-page">
        {this.state.albums.map(album => {
          return (
            <Album
              title={album.name}
              artist={album.artist}
              releaseYear={album.releaseYear}
              genre={album.genre}
              coverPictureSrc={album.coverPictureSrc}
              rating={album.rating}
              description={album.description}
              onClickFavoriteButton={() => this.addAlbum(album.id)}
            />
          );
        })}
      </div>
    )
  }
}
