import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import SpotifyToken from "./components/spotifyTokenComponent/spotifyToken";
import SpotifyMusicPlaylist from "./components/spotifyMusicPlaylist/spotifyMusicPlaylist";

export default class App extends Component {
import { BrowserRouter as Router, Route } from "react-router-dom";
import loginSignUp from "./components/loginSignUp/loginSignUp";
import dummyUser from "./components/loginSignUp/dummyUser";
import Error from "./components/error/error";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/spotifytoken" component={SpotifyToken} />
          <Route exact path="/" component={SpotifyToken} />
          <Error />
          <Route exact path="/" component={loginSignUp} />
          <Route path="/dummy" component={dummyUser} />
        </div>
      </Router>
    );
  }
}

export default App;
