import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader,
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class SpotifyMusicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      songsWithCustom: []
    };
  }

  afterSaveCell(row, cellName, cellValue) {
    const playlist = this.state.songsWithCustom;
    const ids = [];
    playlist.map(song => ids.push(song.id));
    if (ids.indexOf(row.id) === -1) {
      playlist.push(row);
    } else {
      playlist.splice(ids.indexOf(row.id), 1, row);
    }
    console.log(this.state.songsWithCustom);
  }

  postSongsWithCustom = async () => {
    const playlist = this.state.songsWithCustom;
    for (let i = 0; i < playlist.length; i++) {
      const song = await fetch("/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          musicSetId: playlist[i].musicSetId,
          title: playlist[i].title,
          artist: playlist[i].artist,
          releaseDate: playlist[i].releaseDate,
          genre: playlist[i].genre,
          physiological: playlist[i].physiological,
          emotion: playlist[i].emotion
        })
      });
      const song1 = await song.json();
      console.log(song1);
    }
  };

  async createPlaylistOnSpotify() {
    const userResp = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        Authorization: "Bearer " + this.props.spotifyToken
      })
    });
    const userData = await userResp.json();
    let response = await fetch(
      new Request(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          Authorization: "Bearer " + this.props.spotifyToken
        }),
        body: JSON.stringify({
          name: "Broc's Playlist",
          public: true
        })
      })
    )
      .then(res => res.json())
      .then(res =>
        this.addTrackToSpotifyPlaylist(
          userData.id,
          res.id,
          "4iV5W9uYEdYUVa79Axb7Rh"
        )
      );
  }

  async addTrackToSpotifyPlaylist(userId, playlistId, trackId) {
    console.log(playlistId);
    let addTrack = await fetch(
      new Request(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`,
        {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            Authorization: "Bearer " + this.props.spotifyToken
          })
        }
      )
    );
  }

  render() {
    console.log(this.props);
    let songs = [];
    if (this.props.spotifySongs !== undefined) {
      this.props.spotifySongs.map(index =>
        songs.push({
          name: index.track.name,
          artist: index.track.artists[0].name,
          id: index.track.id,
          releaseDate: "",
          genre: "",
          physiological: "",
          emotion: "",
          musicSetTitle: this.state.title
        })
      );
    }

    const cellEditProp = {
      mode: "dbclick"
    };

    const cellEdit = {
      mode: "click",
      afterSaveCell: this.afterSaveCell.bind(this)
    };

    return (
      <div>
        <form>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Choose a title for your new music set"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormGroup>
        </form>
        <div>
          <BootstrapTable
            data={songs}
            cellEdit={cellEditProp}
            cellEdit={cellEdit}
            hover
            striped
            condensed
            search
          >
            <TableHeaderColumn dataField="name" isKey>
              Song
            </TableHeaderColumn>
            <TableHeaderColumn dataField="artist" editable={false}>
              artist
            </TableHeaderColumn>
            <TableHeaderColumn dataField="id" editable={false} hidden>
              id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="releaseDate">
              Release Date
            </TableHeaderColumn>
            <TableHeaderColumn dataField="genre">Genre</TableHeaderColumn>
            <TableHeaderColumn dataField="physiological">
              Physiological
            </TableHeaderColumn>
            <TableHeaderColumn dataField="emotion">Emotion</TableHeaderColumn>

            <TableHeaderColumn dataField="musicSetTitle" hidden>
              Music Set Title
            </TableHeaderColumn>
          </BootstrapTable>
          <Button>Save to Hey DJ database</Button>
          <Button onClick={() => this.createPlaylistOnSpotify()}>
            Export to Spotify
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotifySongs: state.spotifySongsReducer.spotifySongs,
  userId: state.userReducer.userId,
  spotifyToken: state.tokenReducer.spotifyToken
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyMusicTable);
