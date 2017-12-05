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
      songsWithCustom: [],
      musicSetId: ""
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

  createMusicSetAndPostSongs = async () => {
    const set = await fetch("/musicSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.props.spotifyTitle,
        _id: this.props.userId
      })
    });
    const set1 = await set.json();
    this.setState({ musicSetId: set1._id });
    const playlist = this.state.songsWithCustom;
    for (let i = 0; i < playlist.length; i++) {
      const song = await fetch("/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.state.musicSetId,
          spotifyId: playlist[i].id,
          title: playlist[i].name,
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

  postSongsWithCustom = async () => {
    const playlist = this.state.songsWithCustom;
    for (let i = 0; i < playlist.length; i++) {
      const song = await fetch("/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.state.musicSetId,
          spotifyId: playlist[i].id,
          title: playlist[i].name,
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
        `https://api.spotify.com/v1/users/${userId}/playlists/${
          playlistId
        }/tracks?uris=spotify:track:${trackId}`,
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
    console.log(this.state.musicSetId);
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
          musicSetId: this.state.musicSetId
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
        <div>
          <br />
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

            <TableHeaderColumn dataField="musicSetId">
              Music Set Id
            </TableHeaderColumn>
          </BootstrapTable>
          <br />
          <Button
            bsStyle="success"
            onClick={() => {
              this.createMusicSetAndPostSongs();
            }}
          >
            Save music set and save songs
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotifySongs: state.spotifySongsReducer.spotifySongs,
  spotifyPlaylists: state.musicSetReducer.spotifyPlaylists,
  spotifyTitle: state.musicSetReducer.spotifyTitle,
  userId: state.userReducer.userId,
  spotifyToken: state.tokenReducer.spotifyToken
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyMusicTable);
