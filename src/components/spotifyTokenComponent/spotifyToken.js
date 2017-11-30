import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { scope, redirectUri, clientId } from "./frontEndConfig";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { increment, decrement } from "./actions/exampleActions";
import {
  editMusicSetCustomFields,
  editMusicSetCustomFieldValue,
  loadMusicSetFromSpotify
} from "./actions/musicSetActions";
import { setTokenToState } from "./actions/tokenActions";
import Login from "./Login";
import MusicSetComponent from "./components/musicSetComponent/component";

class SpotifyToken extends Component {
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
      this.props.setSpotifyToken(hashParams.access_token);
    }
    this.getSpotifyPlaylists(hashParams.access_token);
  }

  // async getSpotifyPlaylists(auth) {
  //   let playlists = await fetch(
  //     new Request(`https://api.spotify.com/v1/me/playlists`, {
  //       headers: new Headers({
  //         Accept: "application/json",
  //         Authorization: "Bearer " + auth
  //       })
  //     })
  //   )
  //     .then(res => res.json())
  //     .then(res => this.props.setPlaylists(res.items))
  //     .catch(err => err);
  // }

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
  username: state.userReducer.username,
  musicSet: state.musicSetReducer.musicSet,
  spotifyToken: state.tokenReducer.spotifyToken,
  spotifyPlaylists: state.musicSetReducer.spotifyPlaylists,
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  updateMusicSetFields: musicSetFields =>
    dispatch(editMusicSetCustomFields(musicSetFields)),
  editMusicSetFieldValue: (customFields, field, newValue) =>
    dispatch(editMusicSetCustomFieldValue(customFields, field, newValue)),
  setSpotifyToken: spotifyToken => dispatch(setTokenToState(spotifyToken)),
  setPlaylists: playListArray =>
    dispatch(loadMusicSetFromSpotify(playListArray)),
  incr: () => dispatch(increment()),
  decr: () => dispatch(decrement())
});

const Redirect = () => {
  return (
    <div>
      Hello This is the page that spotify redirects the app to once the token is
      authorized!
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
