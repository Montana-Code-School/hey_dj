import React, { Component } from "react";
import NewUser from "../newUser/newUser";
import "./login.css";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      signUpModal: false,
      username: "",
      password: ""
    };
  }

  loginToggle = () => this.setState({ loginModal: !this.state.loginModal });
  signUpToggle = () => this.setState({ signUpModal: !this.state.signUpModal });

  render() {
    return (
      <div>
        <h4> Hey DJ </h4>
        <p>
          Login or create and account to create your own music collections and
          playlists
        </p>
        <Button onClick={this.loginToggle} block>
          Login
        </Button>
        <Button onClick={this.signUpToggle} block>
          Create New Account
        </Button>

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
                  this.validateLogin({
                    username: this.state.username,
                    password: this.state.password
                  });
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
        {this.state.signUpModal ? (
          <NewUser signUpToggle={this.signUpToggle} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Login;
