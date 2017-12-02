import React, { Component } from "react";
import { connect } from "react-redux";
import "./userProfile.css";
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
  Table,
  Alert
} from "react-bootstrap";
import { delete_cookie } from "sfcookies";
import { Link } from "react-router-dom";

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicSets: [],
      username: "",
      email: "",
      showModal: false,
      musicSetTitle: "",
      showUpdateModal: false,
      newTitle: ""
    };
  }

  componentDidMount() {
    fetch("/getUser/" + this.props.userId)
      .then(response => response.json())
      .then(response =>
        this.setState({
          username: response[0].username,
          email: response[0].email
        })
      );
    fetch("/username/" + this.props.userId)
      .then(response => response.json())
      .then(response => this.setState({ musicSets: response }));
  }

  editProfile = () => {
    fetch("/updateUser/" + this.props.userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    }).then(response => response.json());
  };

  deleteProfile = () => {
    fetch("/delete/" + this.props.userId, {
      method: "DELETE"
    }).then(() => {
      delete_cookie("userKey");
      this.props.history.push("/");
    });
  };

  editMusicSet = setId => {
    fetch("/editMusicSet/" + setId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.newTitle
      })
    });
    fetch("/username/" + this.props.userId)
      .then(response => response.json())
      .then(response => this.setState({ musicSets: response }));
  };

  deleteMusicSet = setId => {
    fetch("/removeMusicSet/" + setId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetch("/username/" + this.props.userId)
      .then(response => response.json())
      .then(response => this.setState({ musicSets: response }));
  };

  render() {
    return (
      <div>
        <div className="gridProfile">
          <div className="user">
            <div>
              <Link to="/user">back</Link>
            </div>
            <div className="userInfo">
              <div>
                <div>
                  <h2>{this.state.username}</h2>
                </div>
                <div>
                  <input
                    onChange={e => this.setState({ email: e.target.value })}
                    type="text"
                    value={this.state.email}
                  />
                </div>
                <Button
                  bsStyle="warning"
                  bsSize="xs"
                  onClick={() => {
                    this.editProfile();
                    this.setState({ showUpdateModal: true });
                  }}
                >
                  Update Account
                </Button>{" "}
                <Button
                  bsStyle="danger"
                  bsSize="xs"
                  onClick={() => this.setState({ showModal: true })}
                >
                  Delete Account
                </Button>
              </div>
            </div>
            <hr />
            <h3>Your Music Collections</h3>
            <Table hover responsive bordered condensed>
              <tbody>
                {this.state.musicSets.map(musicSet => (
                  <tr>
                    <td>{musicSet.title}</td>
                    <td>
                      <Button
                        onClick={() => {
                          this.editMusicSet(musicSet._id);
                          this.setState({ showUpdateModal: true });
                        }}
                        bsStyle="warning"
                        bsSize="xs"
                      >
                        Edit Title
                      </Button>
                    </td>
                    <td>
                      <Button
                        bsStyle="danger"
                        bsSize="xs"
                        onClick={() => this.deleteMusicSet(musicSet._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <Modal
          bsSize="small"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Body>
            {" "}
            <Alert bsStyle="danger">
              <h4>Are you sure?</h4>

              <p>
                <Button
                  onClick={() => {
                    this.setState({ showModal: false });
                    this.deleteProfile();
                  }}
                >
                  Delete Account
                </Button>
              </p>
            </Alert>
          </Modal.Body>
        </Modal>
        <Modal
          bsSize="small"
          show={this.state.showUpdateModal}
          onHide={() => this.setState({ showUpdateModal: false })}
        >
          <Modal.Body>
            {" "}
            <Alert bsStyle="warning">
              <h4>Update Successful!</h4>

              <p>
                <Button
                  onClick={() => {
                    this.setState({ showUpdateModal: false });
                  }}
                >
                  Hide
                </Button>
              </p>
            </Alert>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(mapStateToProps)(userProfile);
