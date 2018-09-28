import React, { Component } from 'react';
import "./style.css";

export default class UserAlbum extends Component {
    render() {
        return (
            <div className="album-container">
                <div className="album-image-container">
                    <img className="album-image" src={`images/${this.props.albumImgSrc}`} alt="album cover"/>
                </div>
                <div className="album-info-container">
                    <h3>{this.props.albumTitle}</h3>
                    <h3>{this.props.albumArtist}</h3>
                </div>
                <button onClick={this.addAlbum}>Delete From Collection</button>
            </div>

        )
    }
}   
