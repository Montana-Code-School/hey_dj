import React, { Component } from "react";
import { scope, redirectUri, clientId } from "../../frontEndConfig";
import { connect } from "react-redux";
import {
  editMusicSetCustomFields,
  editMusicSetCustomFieldValue,
  loadMusicSetFromSpotify
} from "../../actions/musicSetActions";
import MusicSetComponent from "../musicSetComponent/component";
import { setTokenToState } from "../../actions/tokenActions";

class SpotifyMusicPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = { spotifyToken: this.props.spotifyToken };
  }

  componentDidMount() {
    console.log("Spotify Music Playlist token", this.state.spotifyToken);
    this.getSpotifyPlaylists(this.state.spotifyToken);
  }

  async getSpotifyPlaylists(auth) {
    let response = await fetch(
      new Request(`https://api.spotify.com/v1/me/playlists`, {
        headers: new Headers({
          Accept: "application/json",
          Authorization: "Bearer " + auth
        })
      })
    );
    try {
      const playlists = await response.json();
      this.props.setPlaylists(playlists.items);
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    return <div>This is the spotify music playlist component</div>;
  }
}

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
  setPlaylists: playListArray =>
    dispatch(loadMusicSetFromSpotify(playListArray)),
  setSpotifyToken: spotifyToken => dispatch(setTokenToState(spotifyToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SpotifyMusicPlaylist
);
