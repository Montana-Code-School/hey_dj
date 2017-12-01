import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import SpotifyToken from "./components/spotifyTokenComponent/spotifyToken";
import SpotifyMusicPlaylist from "./components/spotifyMusicPlaylist/spotifyMusicPlaylist";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/spotifytoken" component={SpotifyToken} />
          <Route exact path="/" component={SpotifyToken} />
        </div>
      </Router>
    );
  }
}
