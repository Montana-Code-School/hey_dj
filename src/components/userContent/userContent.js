import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Grid, Row, Col, Table } from "react-bootstrap";
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
      newPlaylist: []
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

  handleRowSelect(row, isSelected, event) {
    let playlist = this.state.newPlaylist;
    if (isSelected) {
      playlist.push(row);
      this.setState({ newPlaylist: playlist });
    } else {
      const index = playlist.indexOf(row);
      playlist.splice(index, 1);
      this.setState({ newPlaylist: playlist });
    }
  }

  render() {
    const selectRow = {
      mode: "checkbox",
      onSelect: this.handleRowSelect.bind(this),
      clickToSelect: true
    };

    return (
      <div>
        <PageHeader>
          Hey DJ<br /> <small>{this.props.username}</small>
        </PageHeader>
        <LinkContainer to="/profile">
          <a>{this.props.username}</a>
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

              {this.state.newPlaylist.length !== 0 ? (
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
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  userId: state.userId
});

export default connect(mapStateToProps)(userContent);
