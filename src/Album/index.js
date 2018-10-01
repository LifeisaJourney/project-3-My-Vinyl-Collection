import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AlbumDetails from '../AlbumDetails';

export default class Album extends Component {

  render() {
    return (

      <div className="album-container" >
        <Link to={`/albums/${this.props.id}`}>
          <div>{this.props.title}</div>
          <div>{this.props.artist}</div>
          <div>{this.props.releaseYear}</div>
          <div><img src={`images/${this.props.coverPictureSrc}`}></img></div>
        </Link>
        <Route exact path={`/albums/${this.props.id}`}
          render={(props) => <AlbumDetails {...props} />} />
        <button
          className="add-album-butom"
          type="button"
          onClick={this.props.onClickAddButton}>Add to my list</button>
      </div>
    )
  }
}
