import React, { Component } from 'react';
import { BrowserRouter as Router }from 'react-router-dom';

export default class AlbumDetails extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>{this.props.title}</div>
          <div>{this.props.artist}</div>
          <div>{this.props.releaseYear}</div>
          <div>{this.props.genre}</div>
          <div><img src={`images/${this.props.coverPictureSrc}`}></img></div>
          <div>{this.props.rating}</div>
          <div>{this.props.description}</div>
        </div>
      </Router>
    )
  }
}
