import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import loginSignUp from "./components/loginSignUp/loginSignUp";
import dummyUser from "./components/loginSignUp/dummyUser";
import Error from "./components/error/error";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Error />
          <Route exact path="/" component={loginSignUp} />
          <Route path="/dummy" component={dummyUser} />
        </div>
      </Router>
    );
  }
}

export default App;
