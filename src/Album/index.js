import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AlbumDetails from "../AlbumDetails";

export default class Album extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>{this.props.title}</div>
          <div>{this.props.artist}</div>
          <div>{this.props.releaseYear}</div>
          <div><img src={`images/${this.props.coverPictureSrc}`}></img></div>
          <button
            className="add-album-butom"
            onClick={this.props.onClickAddButton}>Add to my list</button>
          <button
          className="see-details-buttom"> <Link to='/albums/:id'>See details</Link></button>
          <Route exact path="/albums/:id" 
          render={(props) => <AlbumDetails {...props}/>}
          />
      </div>
      </Router>

    )
  }
}
