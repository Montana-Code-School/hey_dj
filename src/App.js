import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import SpotifyToken from "./components/spotifyTokenComponent/spotifyToken";
import SpotifyMusicPlaylist from "./components/spotifyMusicPlaylist/spotifyMusicPlaylist";

import loginSignUp from "./components/loginSignUp/loginSignUp";
import dummyUser from "./components/loginSignUp/dummyUser";
import Error from "./components/error/error";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/spotifytoken" component={SpotifyToken} />
          <Error />
          <Route exact path="/" component={loginSignUp} />
        </div>
      </Router>
    );
  }
}
