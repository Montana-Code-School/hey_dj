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
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import SpotifyPlaylistContainer from "../spotifyPlaylistContainer/spotifyPlaylistContainer";
import SpotifyMusicTable from "../spotifyMusicTable/spotifyMusicTable";
import "./spotifyMusicPlaylist.css";
import { Button, PageHeader, Grid, Row, Col } from "react-bootstrap";

class SpotifyMusicPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasReceivedPlaylists: false
    };
  }
  componentDidMount() {
    this.getSpotifyPlaylists(this.props.spotifyToken);
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
      setTimeout(() => {
        this.getSpotifyPlaylists();
      }, 3000);
    }
  }

  render() {
    let playlists = [];
    if (this.props.spotifyPlaylists instanceof Array) {
      this.props.spotifyPlaylists.map(index =>
        playlists.push(<SpotifyPlaylistContainer playlistInformation={index} />)
      );
    }

    const displayPlaylists = () => {
      for (var i = 0; i < playlists.length; i++) {
        <tr>playlists[i]</tr>;
      }
    };
    return (
      <div>
        <PageHeader>
          <Col md={10}>
            <LinkContainer to="/user">
              <h1>Hey DJ</h1>
            </LinkContainer>
          </Col>
          <Col md={2}>
            <LinkContainer to="/profile">
              <h3
                className="headerName"
                class="glyphicon glyphicon-headphones"
                aria-hidden="true"
              >
                {this.props.username}
              </h3>
            </LinkContainer>
          </Col>
          <br />
        </PageHeader>

        <Col md={3}>
          <br />
          <div className="playlistHeader">Spotify Playlists</div>

          <div className="playlistBody">
            {playlists.map(list => <div>{list}</div>)
            /*playlists*/
            }
          </div>
        </Col>
        <Col md={9}>
          <SpotifyMusicTable history={this.props.history} />
        </Col>
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
