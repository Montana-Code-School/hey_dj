import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import SpotifyToken from "./components/spotifyTokenComponent/spotifyToken";
import SpotifyMusicPlaylist from "./components/spotifyMusicPlaylist/spotifyMusicPlaylist";
import loginSignUp from "./components/loginSignUp/loginSignUp";
import userContent from "./components/userContent/userContent";
import userProfile from "./components/userProfile/userProfile";
import Error from "./components/error/error";
import { ConnectedRouter as Router } from "react-router-redux";
import { history } from "./store";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={SpotifyToken} />
          <Route
            exact
            path="/createmusicset"
            component={SpotifyMusicPlaylist}
          />
          <Error />
          <Route exact path="/loginsignup" component={loginSignUp} />
          <Route path="/user" component={userContent} />
          <Route path="/profile" component={userProfile} />
        </div>
      </Router>
    );
  }
}
