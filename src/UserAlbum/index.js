import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import "./style.css";

export default class UserAlbum extends Component {
    albumClick = async(id) => {
        this.setState ({
            id: id
        });
    }

    render() {
        return (
            <div className="album-container" onClick={this.albumClick}>
                <Link to={`/albums/${this.props.id}`}>
                    <div className="album-image-container">
                        <img className="album-image" src={`images/${this.props.albumImgSrc}`} alt="album cover" />
                    </div>
                    <div className="album-info-container">
                        <h3>{this.props.albumTitle}</h3>
                        <h3>{this.props.albumArtist}</h3>
                    </div>
                    <button className='deletion-button' onClick={this.props.onClickDeleteButton}>Delete From Collection</button>
                </Link>
            </div>

        )
    }
}   
