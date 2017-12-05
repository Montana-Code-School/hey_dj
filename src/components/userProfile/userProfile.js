import React, { Component } from "react";
import { connect } from "react-redux";
import "./userProfile.css";
import { Button, Modal, Table, Alert, PageHeader, Col } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { delete_cookie } from "sfcookies";
import { Link } from "react-router-dom";

const cellEditProp = {
  mode: "click"
};

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
        <PageHeader>
          <Col md={10}>
            <LinkContainer to="/user">
              <h1>Hey DJ</h1>
            </LinkContainer>
          </Col>
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
        <div className="gridProfile">
          <div className="user">
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
                <br />
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
            <h3>Music Collections</h3>

            <Table hover responsive bordered condensed>
              <tbody>
                {this.state.musicSets.map(musicSet => (
                  <tr>
                    <td>{musicSet.title}</td>

                    <td className="delete">
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
  username: state.userReducer.username,
  userId: state.userReducer.userId
});

export default connect(mapStateToProps)(userProfile);
