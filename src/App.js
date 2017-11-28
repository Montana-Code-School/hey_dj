import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { scope, redirectUri, clientId } from "./frontEndConfig";

import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { increment, decrement } from "./actions/exampleActions";
import Login from "./Login";

class App extends Component {
  state = {
    token: ""
  };

  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      const uri = `https://accounts.spotify.com/authorize?client_id=${
        clientId
      }&scope=${scope}&response_type=token&redirect_uri=${redirectUri}`;

      const encodedURI = encodeURIComponent(uri);
      console.log(encodedURI);
      console.log(decodeURIComponent(encodedURI));

      window.location.href = uri;
    } else {
      this.setState({ token: hashParams.access_token });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            Your token is {this.state.token}
            <Route exact path="*" component={Home} />
            <Route
              path="/callback"
              component={() => (
                <div>
                  Hello This is the page that spotify redirects the app to once
                  the token is authorized!
                </div>
              )}
            />
          </div>
        </Router>
        <div className="App">
          {this.props.username ? "Hello " + this.props.username : <Login />}
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Counter!!!</h1>
          </header>
          <p className="App-intro">
            {this.props.count}
            <button onClick={this.props.incr}>+1</button>
            <button onClick={this.props.decr}>-1</button>
          </p>
        </div>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const CallBack = () => (
  <div>
    <h2>CallBack</h2>
  </div>
);

/*"https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";*/
//export default App;

const mapStateToProps = state => ({
  username: state.username,
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  incr: () => dispatch(increment()),
  decr: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
