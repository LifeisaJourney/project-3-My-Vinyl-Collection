import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


export default class UserWithSameTaste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMates: []
    }
  }
  componentDidMount = async () => {
    this.fetchUserMates()
  }

  fetchUserMates = async () => {
    const id = this.props.id;
    const response = await fetch(`/api/albums/${id}/users`)
    const userMates = await response.json();
    this.setState({
      userMates: userMates
    })
  }


  render() {

    return (
      <div>
        {this.state.userMates.length > 0 && (
        <div className="usermate-list-container">
          <h2>Check out who also owns this album</h2>
          <div>
            {this.state.userMates.map(userMate => {
              return (
                <div className="usermate-container">
                  <div className="usermate-name">
                    {userMate.username}
                  </div>
                  <div className="usermate-picture">
                    <img src={`images/${userMate.pictureSrc}`}></img>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        )}
      </div>


    )
  }
}


