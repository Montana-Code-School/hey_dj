import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, PageHeader, Grid, Row, Col, Table } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const selectRowProp = {
  mode: "checkbox"
};

class userContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicSets: [],
      songs: [],
      newPlaylist: [],
      songsWithCustom: []
    };
  }

  componentDidMount() {
    fetch("/username/" + this.props.userId)
      .then(response => response.json())
      .then(response => this.setState({ musicSets: response }));
  }

  getMusicSet = id =>
    fetch("/getSongs/" + id)
      .then(response => response.json())
      .then(response => {
        this.setState({ songs: response });
        this.setState({ newPlaylist: [] });
      });

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

  render() {
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
    console.log(this.props.username);

    return (
      <div>
        <PageHeader>
          Hey DJ<br /> <small>{this.props.username}</small>
        </PageHeader>
        <LinkContainer to="/profile">
          <a>{this.props.username}</a>
        </LinkContainer>
        <hr />
        <LinkContainer to="/spotifytoken">
          <a>Make new music set</a>
        </LinkContainer>
        <Grid>
          <Row className="show-grid">
            <Col md={3}>
              <ul>
                {this.state.musicSets.map(musicSet => (
                  <li onClick={() => this.getMusicSet(musicSet._id)}>
                    {musicSet.title}
                  </li>
                ))}
              </ul>
              {this.state.newPlaylist.length !== 0 ? (
                <div>
                  <BootstrapTable
                    data={this.state.newPlaylist}
                    hover
                    striped
                    condensed
                  >
                    <TableHeaderColumn dataField="title" isKey>
                      Song
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="artist">
                      Artist
                    </TableHeaderColumn>
                  </BootstrapTable>

                  <Button>Export to Spotify</Button>
                </div>
              ) : (
                ""
              )}
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
              <BootstrapTable
                data={this.state.songs}
                selectRow={selectRow}
                cellEdit={cellEditProp}
                cellEdit={cellEdit}
                hover
                striped
                condensed
                search
              >
                <TableHeaderColumn dataField="title" isKey>
                  Song
                </TableHeaderColumn>
                <TableHeaderColumn dataField="artist" editable={false}>
                  Artist
                </TableHeaderColumn>
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
              <Button onClick={this.postSongsWithCustom}>Save</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  userId: state.userReducer.userId
});

export default connect(mapStateToProps)(userContent);
