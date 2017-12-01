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
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>#</th>

                    <th>Song</th>
                    <th>Artist</th>
                    <th>Release Date</th>
                    <th>Physiological</th>
                    <th>Genre</th>
                    <th>Emotion</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.songs.map(song => (
                    <tr>
                      <td>{song.spotifyData[0]}</td>
                      <td>{song.spotifyData[1]}</td>
                      <td>{song.customValues[0]}</td>
                      <td>{song.customValues[1]}</td>
                      <td>{song.customValues[2]}</td>
                      <td>{song.customValues[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
