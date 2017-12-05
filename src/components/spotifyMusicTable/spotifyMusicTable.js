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
import { Link } from "react-router-dom";

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
    //I'm not sure if the conditional below works
    if (set.status !== 200) {
      this.props.addErrorMessage("Music set creation failed.");
    }
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
      console.log(this.props);
      const redirect = await this.props.history.push("/user");
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

    const options = {
      defaultSortName: "name",
      defaultSortOrder: "desc"
    };
    console.log("here" + this.props.username);
    return (
      <div>
        {this.props.spotifyTitle ? (
          <div>
            <br />
            <BootstrapTable
              data={songs}
              options={options}
              cellEdit={cellEditProp}
              cellEdit={cellEdit}
              hover
              striped
              condensed
              search
            >
              <TableHeaderColumn dataField="name" editable={false} dataSort>
                Song
              </TableHeaderColumn>
              <TableHeaderColumn dataField="artist" editable={false} dataSort>
                Artist
              </TableHeaderColumn>
              <TableHeaderColumn dataField="id" editable={false} hidden isKey>
                id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="releaseDate" dataSort>
                Release Date
              </TableHeaderColumn>
              <TableHeaderColumn dataField="genre" dataSort>
                Genre
              </TableHeaderColumn>
              <TableHeaderColumn dataField="physiological" dataSort>
                Physiological
              </TableHeaderColumn>
              <TableHeaderColumn dataField="emotion" dataSort>
                Emotion
              </TableHeaderColumn>
            </BootstrapTable>
            <br />
            <Button
              bsStyle="primary"
              onClick={() => {
                this.createMusicSetAndPostSongs();
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <h3>Choose a spotify playlist to add custom values</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotifySongs: state.spotifySongsReducer.spotifySongs,
  spotifyPlaylists: state.musicSetReducer.spotifyPlaylists,
  spotifyTitle: state.musicSetReducer.spotifyTitle,
  userId: state.userReducer.userId,
  spotifyToken: state.tokenReducer.spotifyToken,
  username: state.userReducer.username
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyMusicTable);
