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
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { heyDjLogin } from "../../actions/userActions";
import { bake_cookie } from "sfcookies";
import { addErrorMessage } from "../../actions/errorActions";
import { connect } from "react-redux";
import BackgroundImage from "../backgroundImage/backgroundImage";

require("typeface-shrikhand");

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
      const userInfo = await user.json();
      this.props.heyDjLogin(userInfo.username, userInfo._id);
      this.props.history.push("/user");
    } else {
      this.props.addErrorMessage(
        "Account creation failed. Check username and/or password."
      );
    }
  }

  async loginUser() {
    const user = await fetch("/authenticate", {
      method: "post",
      headers: {
        authorization:
          "Basic " +
          base64.encode(this.state.username + ":" + this.state.password),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const userInfo = await user.json();
    if (user.status === 200) {
      this.props.heyDjLogin(userInfo.username, userInfo._id);
    } else {
      this.props.addErrorMessage(
        "Login failed. Check username and/or password."
      );
    }
    bake_cookie("userKey", userInfo.token);
    if (userInfo.success) {
      this.props.history.push("/user");
    }
  }

  render() {
    console.log(this.props.error);
    return (
      <div className="login">
        <div className="backgroundImage">
          <BackgroundImage />
        </div>

        <PageHeader>
          Hey DJ<br />
          <small>customize your spotify playlists</small>
        </PageHeader>

        <Button onClick={this.loginToggle} block>
          Login
        </Button>
        <Button onClick={this.signUpToggle} block>
          Create New Account
        </Button>

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
  username: state.userReducer.username,
  userId: state.userReducer.userId
});

const mapDispatchToProps = dispatch => ({
  heyDjLogin: (e, a) => dispatch(heyDjLogin(e, a)),
  addErrorMessage: e => dispatch(addErrorMessage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp);
