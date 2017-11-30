import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Redirect />
          <Route exact path="*" component={Home} />
          <Switch>
            <Route path="/musicSet" component={MusicSetComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}
