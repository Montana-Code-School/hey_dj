import React, { Component } from "react";
import { scope, redirectUri, clientId } from "../../frontEndConfig";
import { connect } from "react-redux";
import { setTokenToState } from "../../actions/tokenActions";
import MusicSetComponent from "../musicSetComponent/component";
import SpotifyMusicPlaylist from "../spotifyMusicPlaylist/spotifyMusicPlaylist";

class SpotifyToken extends Component {
  constructor(props) {
    super(props);
    this.state = { spotifyToken: "" };
  }

  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    if (!hashParams.access_token) {
      const uri = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scope}&response_type=token&redirect_uri=${redirectUri}`;
      const encodedURI = encodeURIComponent(uri);
      console.log(encodedURI);
      console.log(decodeURIComponent(encodedURI));
      window.location.href = uri;
    } else {
      this.props.setSpotifyToken(hashParams.access_token);
      this.setState({ spotifyToken: hashParams.access_token });
    }
  }

  render() {
    return <SpotifyMusicPlaylist />;
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

const mapStateToProps = state => ({
  spotifyToken: state.tokenReducer.spotifyToken
});

const mapDispatchToProps = dispatch => ({
  setSpotifyToken: spotifyToken => dispatch(setTokenToState(spotifyToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyToken);
