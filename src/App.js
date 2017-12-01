import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import loginSignUp from "./components/loginSignUp/loginSignUp";
import userContent from "./components/userContent/userContent";
import userProfile from "./components/userProfile/userProfile";
import Error from "./components/error/error";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Error />
          <Route exact path="/" component={loginSignUp} />
          <Route path="/user" component={userContent} />
          <Route path="/profile" component={userProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
