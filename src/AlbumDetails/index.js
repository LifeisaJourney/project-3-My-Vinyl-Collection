import React, { Component } from 'react';
import UserWithSameTaste from '../UserWithSameTaste';
import { BrowserRouter as Router } from 'react-router-dom';
import "./style.css";
export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {}
    }
  }

  componentDidMount = async () => {
    this.fetchAlbum()
  }

  fetchAlbum = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(`/api/albums/${id}`)
    const album = await response.json();
    this.setState({
      album: album
    })
  }

  render() {

    return (

      <div>
        <div className="album-container-list">
          <div className='side-panel-1'>
            <div className="album-tittle">
              <h2>Album Title</h2>
              <div className='return-input'>{this.state.album.title}</div>
            </div>
            <div className="a1 album-artist">
              <h2>Artist</h2>
              <div className='return-input'>{this.state.album.artist}</div>
            </div>
            <div className="a1 album-release">
              <h2>Release Year</h2>
              <div className='return-input'>{this.state.album.releaseYear}
              </div>
            </div>
            <div className="a1 album-genre">
              <h2>Genre</h2>
              <div className='return-input'>{this.state.album.genre}</div>
            </div>
          </div>
          <div className='side-panel-2'>
            <div className="album-image-container">
              <h2>Cover</h2>
              <img className="album-image-individual" src={`../images/${this.state.album.coverPictureSrc}`} />
            </div>
            <div className="a1 album-rating">
              <h2 className='return-input'>Rating: <span> {this.state.album.rating}</span></h2>
            </div>
            <div className="a1 album-description">
              <h2>Description</h2>
              <div className='return-input'>{this.state.album.description}</div>
            </div>
          </div>
        </div>
        <div className='same-taste'>
          <UserWithSameTaste
            id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}
