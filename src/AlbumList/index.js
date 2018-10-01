import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Album from "../Album";
import "./style.css";

export default class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      user: {},
      title:'',
      album:{}
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
    await fetch('api/current-user/albums', {
      method: 'POST',
      body: JSON.stringify({ albumId: id }),
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('user-jwt')
      }
    })
    this.fetchUser();
  }

  inputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getAlbum = async(event) => {
    event.preventDefault();
    this.fetchAlbums();
  }

  render() {
    return (
      <div>
        <div className="album-list-page">
          <h1>Select one of the albums from our list</h1>
          <form className="album-search-input">
            <label>Search Album By Title: </label>
            <input type='text' name='title' value={this.state.title} placeholder='Album Title' onChange={this.inputChange}></input>
            <button type='button' onClick={this.getAlbum}>Submit</button>
          </form>
        </div>
        <div className="album-list-container">
          {this.state.albums.map(album => {
            return (
              <Album
                key={album.id}
                id={album.id}
                title={album.title}
                artist={album.artist}
                coverPictureSrc={album.coverPictureSrc}
                addedAlbum={this.state.user.albumId === album.id}
                onClickAddButton={() => this.addAlbum(album.id)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
