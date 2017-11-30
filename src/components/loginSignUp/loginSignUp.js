import React, { Component } from "react";
import "./loginSignUp.css";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader
} from "react-bootstrap";
import { heyDjLogin } from "../../actions/userActions";
import { connect } from "react-redux";
var base64 = require("base-64");

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      signUpModal: false,
      username: "",
      password: "",
      email: ""
    };
  }

  loginToggle = () => this.setState({ loginModal: !this.state.loginModal });
  signUpToggle = () => this.setState({ signUpModal: !this.state.signUpModal });

  async createUser() {
    const user = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    });
    if (user.status === 200) {
      alert("Account Created Successfully!!");
    } else alert("Account Creation Failed");
    const userInfo = await user.json();
    this.props.heyDjLogin(userInfo.username); //needs error handling improvement
    //after new account created needs to redirect to another page - maybe user page
  }

  async loginUser() {
    const user = await fetch("/authenticate", {
      method: "POST",
      headers: {
        authorization:
          "Basic " +
          base64.encode(this.state.username + ":" + this.state.password)
      }
    });
    console.log(user);
  }

  render() {
    return (
      <div>
        <PageHeader>
          {" "}
          Hey DJ <small>Customize your Spotify playlists</small>
        </PageHeader>

        <Button onClick={this.loginToggle} block>
          Login
        </Button>
        <Button onClick={this.signUpToggle} block>
          Create New Account
        </Button>
        <div>
          <h3>{this.props.username}</h3>
        </div>

        {this.state.signUpModal ? (
          <Modal
            bsSize="small"
            show={this.state.signUpModal}
            onHide={() => {
              this.setState({ showModal: false });
              this.signUpToggle();
            }}
          >
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>

                  <FormControl
                    onChange={e => this.setState({ email: e.target.value })}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>

                  <FormControl
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password"
                  />
                </FormGroup>
                <Button
                  bsStyle="primary"
                  onClick={e => {
                    e.preventDefault();
                    this.createUser();
                  }}
                >
                  Create Account
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                bsSize="xsmall"
                onClick={() => {
                  this.setState({ showModal: false });
                  this.signUpToggle();
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
        {this.state.loginModal ? (
          <Modal
            bsSize="small"
            show={this.state.loginModal}
            onHide={this.loginToggle}
          >
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </FormGroup>
                <Button
                  bsStyle="primary"
                  onClick={e => {
                    e.preventDefault();
                    this.loginUser();
                  }}
                >
                  Login
                </Button>{" "}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button bsSize="xsmall" onClick={this.loginToggle}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  heyDjLogin: e => dispatch(heyDjLogin(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp);
