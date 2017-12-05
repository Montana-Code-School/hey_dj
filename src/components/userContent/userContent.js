import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  PageHeader,
  Grid,
  Row,
  Col,
  Table,
  FormControl,
  FormGroup,
  ControlGroup,
  ControlLabel
} from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "./userContent.css";

class userContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicSets: [],
      songs: [],
      newPlaylist: [],
      songsWithCustom: [],
      spotifyTitle: ""
    };
  }

  componentDidMount() {
    fetch("/username/" + this.props.userId)
      .then(response => response.json())
      .then(response => this.setState({ musicSets: response }));
  }

  getMusicSet = id => {
    fetch("/getSongs/" + id)
      .then(response => response.json())
      .then(response => {
        this.setState({ songs: response });
        this.setState({ newPlaylist: [] });
      });
  };

  handleRowSelect(row, isSelected) {
    const playlist = this.state.newPlaylist;
    if (isSelected) {
      playlist.push(row);
      this.setState({ newPlaylist: playlist });
    } else {
      const index = playlist.indexOf(row);
      playlist.splice(index, 1);
      this.setState({ newPlaylist: playlist });
    }
  }

  afterSaveCell(row, cellName, cellValue) {
    const playlist = this.state.songsWithCustom;
    const ids = [];
    playlist.map(song => ids.push(song._id));
    if (ids.indexOf(row._id) === -1) {
      playlist.push(row);
    } else {
      playlist.splice(ids.indexOf(row._id), 1, row);
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
          name: this.state.spotifyTitle,
          public: true
        })
      })
    )
      .then(res => res.json())
      .then(res =>
        this.state.newPlaylist.map(index => {
          this.addTrackToSpotifyPlaylist(userData.id, res.id, index.spotifyId);
        })
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
    const selectRowProp = {
      mode: "checkbox"
    };

    const selectRow = {
      mode: "checkbox",
      onSelect: this.handleRowSelect.bind(this),
      clickToSelectAndEditCell: true
    };

    const cellEditProp = {
      mode: "dbclick"
    };

    const cellEdit = {
      mode: "click",
      afterSaveCell: this.afterSaveCell.bind(this)
    };

    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    return (
      <div>
        <PageHeader>
          <Col md={10}>Hey DJ</Col>
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

        <Grid>
          <Row className="show-grid">
            <Col md={3}>
              <div className="collectionsGrid">
                <table>
                  <tr>
                    <th>Music Collections</th>
                  </tr>
                  <tr>
                    <ul className="list">
                      {this.state.musicSets.map(musicSet => (
                        <li
                          onClick={() => {
                            this.getMusicSet(musicSet._id);
                          }}
                        >
                          {musicSet.title}
                        </li>
                      ))}
                    </ul>
                  </tr>
                </table>
                <br />
                <LinkContainer
                  className="newCollectionButton"
                  to="/createmusicset"
                >
                  <Button bsStyle="primary">Make New Music Collection</Button>
                </LinkContainer>
              </div>
              <div className="hiddenTable">
                {this.state.newPlaylist.length !== 0 ? (
                  <div>
                    <br />

                    <form>
                      <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder="Enter title"
                          onChange={e =>
                            this.setState({ spotifyTitle: e.target.value })
                          }
                        />
                      </FormGroup>
                    </form>

                    <BootstrapTable
                      data={this.state.newPlaylist}
                      hover
                      responsive
                      bordered
                      striped
                      condensed
                    >
                      <TableHeaderColumn dataField="any" dataFormat={indexN}>
                        #{this.state.newPlaylist.length}
                      </TableHeaderColumn>

                      <TableHeaderColumn dataField="title" isKey>
                        Song
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="artist">
                        Artist
                      </TableHeaderColumn>
                    </BootstrapTable>
                    <br />
                    <Button
                      bsStyle="primary"
                      onClick={() => this.createPlaylistOnSpotify()}
                    >
                      Export to Spotify
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>

            <Col md={9}>
              <BootstrapTable
                data={this.state.songs}
                selectRow={selectRow}
                hover
                striped
                condensed
                search
              >
                <TableHeaderColumn dataField="title" isKey>
                  Song
                </TableHeaderColumn>
                <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
                <TableHeaderColumn dataField="releaseDate">
                  Release Date
                </TableHeaderColumn>
                <TableHeaderColumn dataField="genre">Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="physiological">
                  Physiological
                </TableHeaderColumn>
                <TableHeaderColumn dataField="emotion">
                  Emotion
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  userId: state.userReducer.userId,
  spotifyToken: state.tokenReducer.spotifyToken
});

export default connect(mapStateToProps)(userContent);
