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
  render() {
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
          musicSetTitle: this.props.spotifyTitle
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
    console.log(this.props.spotifyTitle);
    return (
      <div>
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

            <TableHeaderColumn dataField="musicSetTitle">
              Music Set Title
            </TableHeaderColumn>
          </BootstrapTable>
          <Button>Save to Hey DJ database</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotifySongs: state.spotifySongsReducer.spotifySongs,
  spotifyPlaylists: state.musicSetReducer.spotifyPlaylists,
  spotifyTitle: state.musicSetReducer.spotifyTitle
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyMusicTable);
