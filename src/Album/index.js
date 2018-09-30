import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default class Album extends Component {
  albumClick = async (id) => {
    this.setState({
      id: id
    });
  }
  render() {
    return (
      <div className="album-container" onClick={this.albumClick}>
        <Link to={`/albums/${this.props.id}`}>
          <div>{this.props.title}</div>
          <div>{this.props.artist}</div>
          <div>{this.props.releaseYear}</div>
          <div><img src={`images/${this.props.coverPictureSrc}`}></img></div>
        </Link>
        <button
          className="add-album-butom"
          type="button"
          onClick={this.props.onClickAddButton}>Add to my list</button>
      </div>
    )
  }
}
