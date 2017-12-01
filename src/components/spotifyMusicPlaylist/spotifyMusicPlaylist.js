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
import SpotifyPlaylistContainer from "../spotifyPlaylistContainer/spotifyPlaylistContainer";
import SpotifyMusicTable from "../spotifyMusicTable/spotifyMusicTable";
import "./spotifyMusicPlaylist.css";

class SpotifyMusicPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasReceivedPlaylists: false
    };
  }

  componentWillReceiveProps() {
    if (!this.state.hasReceivedPlaylists) {
      this.getSpotifyPlaylists(this.props.spotifyToken);
    }
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
      this.state.hasReceivedPlaylists = true;
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    let playlists = [];
    if (this.props.spotifyPlaylists instanceof Array) {
      this.props.spotifyPlaylists.map(index =>
        playlists.push(<SpotifyPlaylistContainer playlistInformation={index} />)
      );
    }

    return (
      <div>
        <div className="grid">{playlists}</div>
        <SpotifyMusicTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  musicSet: state.musicSetReducer.musicSet,
  spotifyToken: state.tokenReducer.spotifyToken,
  spotifyPlaylists: state.musicSetReducer.spotifyPlaylists,
  spotifySongs: state.spotifySongsReducer.spotifySongs
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
