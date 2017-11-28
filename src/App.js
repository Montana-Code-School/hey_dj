import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//https://accounts.spotify.com/authorize?
var client_id = "aba9ab535c464ffb82414772c566057f";
var scope = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-follow-modify",
  "user-follow-read",
  "user-library-read",
  "user-library-modify"
].join(" ");
var encodedScope = encodeURIComponent(scope);
var spoturl = encodeURIComponent(
    "https://accounts.spotify.com/authorize?client_id="
  ),
  scopeText = encodeURIComponent("&scope="),
  responseText = encodeURIComponent(
    "&response_type=token&redirect_uri=http://localhost:3000/callback"
  );
var encodedURI = spoturl + client_id + scopeText + encodedScope + responseText;
console.log(encodedURI);
console.log(decodeURIComponent(encodedURI));

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
      var client_id = "aba9ab535c464ffb82414772c566057f";
      var scope = [
        "user-read-private",
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-follow-modify",
        "user-follow-read",
        "user-library-read",
        "user-library-modify"
      ].join(" ");
      var encodedScope = encodeURIComponent(scope);

      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";
    } else {
      this.setState({ token: hashParams.access_token });
    }
  }

  render() {
    return (
      <Router>
        <div>
          Your token is {this.state.token}
          <Route exact path="*" component={Home} />
          <Route path="/callback" component={() => <div>Hello</div>} />
        </div>
      </Router>
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
export default App;
