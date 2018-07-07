import React, { Component } from 'react';
import logo from './scull4.png';
import './App.css';
import queryString from 'query-string';

class App extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        ...this.state.user,
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        ...this.state.user,
        playlists: data.items
      }
    }))
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Hell {this.state.user.name}</h1>
        </header>
        <p className="App-intro">
          ~ SPOTIFY PLAYLIST CREATOR JS ~
        </p>
      </div>
    );
  }
}

export default App;
