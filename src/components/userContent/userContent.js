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
      songs: []
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
      .then(response => this.setState({ songs: response }));

  render() {
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
            <Col md={1}>
              <ul>
                {this.state.musicSets.map(musicSet => (
                  <li onClick={() => this.getMusicSet(musicSet._id)}>
                    {musicSet.title}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={10}>
              <BootstrapTable
                data={this.state.songs}
                selectRow={selectRowProp}
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
            <Col md={1}>Make a new playlist</Col>
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
