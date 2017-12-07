import React, { Component } from "react";
import { connect } from "react-redux";
import { setTokenToState } from "../../actions/tokenActions";
import { updateSpotifySongs } from "../../actions/spotifySongs";
import { updateSpotifyTitle } from "../../actions/musicSetActions";
import "./spotifyPlaylistContainer.css";

class SpotifyPlaylistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistInformation: props.playlistInformation
    };
  }

  async fetchSongsFromSpotify(index = 0, allSongs = []) {
    let response = await fetch(
      new Request(
        `${this.state.playlistInformation.tracks.href}?offset=${index}`,
        {
          headers: new Headers({
            Accept: "application/json",
            Authorization: "Bearer " + this.props.spotifyToken
          })
        }
      )
    );
    try {
      let songs = await response.json();
      songs = songs.items;
      let combined = songs.concat(allSongs);
      if (songs.length > 99) {
        index += 100;
        return this.fetchSongsFromSpotify(index, combined);
      }
      this.props.setSpotifySongs(combined);
    } catch (e) {
      console.log("playlist error");
    }
  }

  render() {
    if (this.state.playlistInformation !== undefined) {
      let images = [];
      if (this.state.playlistInformation.images.length > 0) {
        images.push(<img src={this.state.playlistInformation.images[0].url} />);
      }
      return (
        <li
          className={
            this.props.selected === this.state.playlistInformation.name
              ? "selected"
              : ""
          }
          onClick={() => {
            this.fetchSongsFromSpotify();
            this.props.setSpotifyTitle(this.state.playlistInformation.name);
          }}
        >
          {this.state.playlistInformation.name}
        </li>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  spotifyToken: state.tokenReducer.spotifyToken,
  spotifySongs: state.spotifySongsReducer.spotifySongs,
  selected: state.musicSetReducer.spotifyTitle
});

const mapDispatchToProps = dispatch => ({
  setSpotifyToken: spotifyToken => dispatch(setTokenToState(spotifyToken)),
  setSpotifySongs: songsArray => dispatch(updateSpotifySongs(songsArray)),
  setSpotifyTitle: spotifyTitle => dispatch(updateSpotifyTitle(spotifyTitle))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SpotifyPlaylistContainer
);
