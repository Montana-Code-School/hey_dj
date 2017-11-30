import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import SpotifyToken from "./components/spotifyTokenComponent/spotifyToken";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={SpotifyToken} />
      </Router>
    );
  }
}
