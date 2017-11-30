import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loginSignUp from "./components/loginSignUp/loginSignUp";
import Error from "./components/error/error";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Error />
          <Route exact path="/" component={loginSignUp} />
        </div>
      </Router>
    );
  }
}

export default App;
