import React, { Component } from "react";
import { connect } from "react-redux";
import { setTokenToState } from "../../actions/tokenActions";
import { updateSpotifySongs } from "../../actions/spotifySongs";
import "./spotifyPlaylistContainer.css";

class SpotifyPlaylistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistInformation: props.playlistInformation
    };
  }

  async fetchSongsFromSpotify() {
    let response = await fetch(
      new Request(this.state.playlistInformation.tracks.href, {
        headers: new Headers({
          Accept: "application/json",
          Authorization: "Bearer " + this.props.spotifyToken
        })
      })
    );
    try {
      const songs = await response.json();
      this.props.setSpotifySongs(songs.items);
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    if (this.state.playlistInformation !== undefined) {
      let images = [];
      if (this.state.playlistInformation.images.length > 1) {
        images.push(<img src={this.state.playlistInformation.images[1].url} />);
      }
      return (
        <div className="main" onClick={() => this.fetchSongsFromSpotify()}>
          <div>{this.state.playlistInformation.name}</div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  spotifyToken: state.tokenReducer.spotifyToken,
  spotifySongs: state.spotifySongsReducer.spotifySongs
});

const mapDispatchToProps = dispatch => ({
  setSpotifyToken: spotifyToken => dispatch(setTokenToState(spotifyToken)),
  setSpotifySongs: songsArray => dispatch(updateSpotifySongs(songsArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SpotifyPlaylistContainer
);
